const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateImage = [
    check('url')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a url"),
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
// get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id

    const reviews = await Review.findAll({
        where: {
            userId: id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt', 'description'] },
                include: SpotImage
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    for (let index = 0; index < reviews.length; index++) {
        reviews[index] = reviews[index].toJSON()
        if (reviews[index].Spot.SpotImages.length > 0) {
            reviews[index].Spot.previewImage = reviews[index].Spot.SpotImages[0].url
        } else {
            reviews[index].Spot.previewImage = null;
        }

        delete reviews[index].Spot.SpotImages
    }

    return res.json({"Reviews": reviews})
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, validateImage, async (req, res, next) => {
    const id = parseInt(req.params.reviewId);
    const url = req.body.url
    const reviewExists = await Review.findByPk(id, {
        include: {
            model: ReviewImage
        }
    })

    if (!reviewExists) {
        const error = new Error("Review couldn't be found")
        error.status = 404
        return next(error)
    }

    if (reviewExists.ReviewImages.length > 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }

    const newImage = await ReviewImage.create({ url, reviewId: id, });

    return res.json({ id: newImage.id, url });

})


//Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body
    const id = req.params.reviewId

    const existingReview = await Review.findByPk(id)

    if (!existingReview) {
        const error = new Error("Review couldn't be found")
        error.status = 404
        return next(error)
    }

    existingReview.update({
        review,
        stars
    })
    return res.json(existingReview)
})


// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId
    const reviewExists = await Review.findByPk(reviewId)

    if (!reviewExists) {
        const error = new Error("Review couldn't be found")
        error.status = 404
        return next(error)
    }

    reviewExists.destroy()

    res.status(200)
    return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
    })
})

module.exports = router;
