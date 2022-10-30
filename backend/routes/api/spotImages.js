const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId
    // find the spot wiht image id
    const spotImage = await SpotImage.findByPk(imageId)

    if (!spotImage) {
        const error = new Error("Spot Image couldn't be found")
        error.status = 404
        return next(error)
    }

    spotImage.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
