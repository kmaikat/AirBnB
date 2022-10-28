const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSpot = [
    check("address")
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check("country")
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check("lat")
        .exists({ checkFalsy: true })
        // .isInt({min:-90, max:90})
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({ checkFalsy: true })
        // .isInt({min:-180, max:180})
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("Price per day is required"),
    handleValidationErrors
]

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]


// get all spots by current user
router.get('/current', requireAuth, async (req, res) => {

    const ownerId = parseInt(req.user.id);
    const spots = await Spot.findAll({
        where: {
            ownerId
        }
    })

    for (let spot of spots) {

        const spotReview = await spot.getReviews({
            attributes: [
                [sequelize.fn('AVG', sequelize.col("stars")), "avgRating"]
            ]

        })
        let avgRating = spotReview[0].dataValues.avgRating
        spot.dataValues.avgRating = parseFloat(Number(avgRating).toFixed(1))


        const spotImage = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })

        if (spotImage) {
            spot.dataValues.previewImage = spotImage.url
        } else {
            spot.dataValues.previewImage = "image url"
        }
    }
    return res.json({ Spots: spots })
})
// add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id)
    const { url, preview } = req.body

    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }

    if (spot.ownerId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error)
    }
    //add image into SpotImages
    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    return res.status(200).json({
        id: newImage.id,
        url,
        preview: true
    })
})

// create a review for a spot based on the spots id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body
    const spotId = parseInt(req.params.spotId)
    const userId = parseInt(req.user.id)

    // no spot err
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404
        return next(error)
    }

    // find all the reviews for the spot associated with the user
    const reviewExists = await Review.findAll({
        where: {
            userId,
            spotId
        }
    })

    // existing review err
    if (reviewExists.length > 0) {
        const error = new Error("User already has a review for this spot")
        error.status = 403
        return next(error)
    }

    // create
    const createReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    })

    res.status(201)
    return res.json(createReview);

})

// get details of a spot from an Id
router.get('/:spotId', async (req, res, next) => {
    const id = parseInt(req.params.spotId);
    const spot = await Spot.findByPk(id, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: "Owner",
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: Review,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
                [Sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
            ],
        },
        group: ["Spot.id", "Owner.id", "SpotImages.id"]
    });

    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }

    return res.json(spot)
})

// edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const id = parseInt(req.params.spotId)
    const spot = await Spot.findByPk(id)

    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }

    if (spot.ownerId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error)
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    // await spot.save();
    return res.json(spot);

})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id)

    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }

    if (spot.ownerId !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        return next(error)
    }

    await spot.destroy()

    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})


// get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    for (let spot of spots) {
        spot.dataValues.avgRating = await spot.getReviews({
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
                ]
            ]
        })
        spot.dataValues.previewImage = "sorry"
    }

    res.json({
        Spots: spots
    })
})

// create a new spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201);
    return res.json(newSpot)
})

module.exports = router;
