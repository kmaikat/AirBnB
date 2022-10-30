const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId
    // find the spot wiht image id
    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        const error = new Error("Review Image couldn't be found")
        error.status = 404
        return next(error)
    }

    reviewImage.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
