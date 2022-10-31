const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check, query } = require("express-validator");
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
        .withMessage("Latitude is not valid"),
    check("lng")
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check("price")
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required")
        .isInt({ min: 1 })
        .withMessage("Price per day is required"),
    handleValidationErrors
]

const validateQuery = [
    query("page")
        .optional()
        .default(1)
        .isInt({ min: 1, max: 20 })
        .withMessage("Page must be greater than or equal to 1"),
    query("size")
        .optional()
        .default(20)
        .isInt({ min: 1, max: 10 })
        .withMessage("Size must be greater than or equal to 1"),
    query("maxLat")
        .optional()
        .isFloat({ max: 90 })
        .withMessage("Maximum latitude is invalid"),
    query("minLat")
        .optional()
        .isFloat({ min: -90 })
        .withMessage("Minimum latitude is invalid"),
    query("minLng")
        .optional()
        .isFloat({ min: -180 })
        .withMessage("Maximum longitude is invalid"),
    query("maxLng")
        .optional()
        .isFloat({ min: 180 })
        .withMessage("Maximum longitude is invalid"),
    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
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

const validateBooking = [
    check("startDate", "Please provide a start date.")
        .exists({ checkFalsy: true }),
    check("endDate", "endDate cannot be on or before startDate")
        .custom((value, { req }) => { return Date.parse(value) > Date.parse(req.body.startDate); }),
    check("endDate", "Please provide an end date.")
        .exists({ checkFalsy: true }),
    handleValidationErrors
];
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

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }

    let bookings;
    if (spot.ownerId === userId) {
        bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: {
                model: User,
            }
        })

    } else {
        bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }
    return res.json({ Bookings: bookings })
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res, next) => {
    const userId = parseInt(req.user.id)
    const spotId = parseInt(req.params.spotId)
    const { startDate, endDate } = req.body
    const spot = await Spot.findByPk(spotId)

    // to date obj
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()

    // if there is no spot with the spot id
    if (!spot) {
        const error = new Error("Spot couldn't be found")
        error.status = 404
        return next(error)
    }
    // console.log("***************LOOK HERE**************", spot)

    // spot cannot belong to current user
    if (spot.dataValues.ownerId === userId) {
        const error = new Error("Forbidden");
        error.status = 403
        return next(error);
    }

    if (start >= end) {
        const error = new Error("endDate cannot be on or before startDate")
        error.status = 400
        return next(error)
    }

    // start date can't be a passed date
    if (start < today) {
        const error = new Error("startDate unavailable")
        error.status = 400
        return next(error)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId
        },
        attributes: ["startDate", "endDate"],
        raw: true
    })

    // if booking exists ...

    for (const booking of bookings) {
        const error = new Error('Sorry, this spot is already booked for the specified dates');
        error.errors = {}
        const bookingStart = new Date(booking.startDate)
        const bookingEnd = new Date(booking.endDate)

        if (bookingStart <= start && start <= bookingEnd) {
            error.errors.startDate = 'Start date conflicts with an existing booking'
        }
        if (bookingStart <= end && end <= bookingEnd) {
            error.errors.endDate = 'End date conflicts with an existing booking'
        }
        if (start <= bookingStart && bookingEnd <= end) {
            error.errors.endDate = "End date conflict with an existing booking"
        }

        // check
        if (error.errors.startDate !== undefined || error.errors.endDate !== undefined) {
            error.status = 403;
            return next(error)
        }
    }

    const book = await Booking.create({
        startDate, endDate, spotId, userId
    });

    return res.json(book);
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
        preview: newImage.preview
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

router.get('/:spotId/reviews', async (req, res, next) => {
    const id = parseInt(req.params.spotId)
    const reviews = await Spot.findByPk(id, {
        attributes: [],
        include: {
            model: Review,
            include: [
                { model: ReviewImage, attributes: ["id", "url"] },
                { model: User, attributes: ["id", "firstName", "lastname"] }
            ]
        }
    })

    if (!reviews) {
        const error = new Error("Spot couldn't be found");
        error.status = 404;
        return next(error)
    }
    res.json(reviews)

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
router.get('/', validateQuery, async (req, res) => {
    // query filter begins here
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


    let pagination = { page, size };
    if (parseInt(page) >= 1 && parseInt(size) >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    let query = {
        where: {},
        include: {}
    }

    if (maxLat && minLat) {
        query.where.lat = { [Op.between]: [parseFloat(minLat), parseFloat(maxLat)] };
    } else if (minLat) {
        query.where.lat = { [Op.gte]: parseFloat(minLat) };
    } else if (maxLat) {
        query.where.lat = { [Op.lte]: parseFloat(maxLat) };
    }

    if (maxLng && minLng) {
        query.where.lng = { [Op.between]: [parseFloat(minLng), parseFloat(maxLng)] };
    } else if (minLng) {
        query.where.lng = { [Op.gte]: parseFloat(minLng) };
    } else if (maxLng) {
        query.where.lng = { [Op.lte]: parseFloat(maxLng) };
    }

    if (maxPrice && minPrice) {
        query.where.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
    } else if (minPrice) {
        query.where.price = { [Op.gte]: parseFloat(minPrice) };
    } else if (maxPrice) {
        query.where.price = { [Op.lte]: parseFloat(maxPrice) };
    }
    // if min price

    const spots = await Spot.findAll({
        ...pagination,
        include: {
            model: SpotImage,
            attributes: ["url"]
        },
        where: query.where

    })
    for (let index = 0; index < spots.length; index++) {
        const spot = spots[index]
        spot.dataValues.avgRating = (await spot.getReviews({
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
                ]
            ],
        }))[0].toJSON().avgRating

        spots[index] = spots[index].toJSON()

        if (spots[index].SpotImages.length > 0) {
            spots[index].previewImage = spots[index].SpotImages[0].url
        } else {
            spots[index].previewImage = null;
        }

        delete spots[index].SpotImages
    }

    res.json({
        Spots: spots,
        page,
        size
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
