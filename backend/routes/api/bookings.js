const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    // find user id
    const userId = req.user.id

    const bookings = await Booking.findAll({
        where: userId,
        include: [{
            model: Spot,
            include: [{
                model: SpotImage,
                where: {
                    preview: true
                },
                attributes: ['url'],
                required: false,
                limit: 1
            }],
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }]
    })

    // for (let booking of bookings) {
    //     if (booking.Spot.SpotImages.length > 0) {
    //         booking.Spot.previewImage = booking.Spot.SpotImages[0].url
    //     }
    // }

    for (let index = 0; index < bookings.length; index++) {
        bookings[index] = bookings[index].toJSON()
        if (bookings[index].Spot.SpotImages.length > 0) {
            bookings[index].Spot.previewImage = bookings[index].Spot.SpotImages[0].url
        } else {
            bookings[index].Spot.previewImage = null;
        }

        delete bookings[index].Spot.SpotImages
    }

    console.log(bookings)
    return res.json(bookings)
})


// edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body
    const spotId = parseInt(req.params.spotId)
    const bookingId = parseInt(req.params.bookingId)
    const userId = parseInt(req.user.id)
    // to date obj
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()

    const booking = await Booking.findByPk(bookingId)

    if (booking) {
        const error = new Error("Booking couldn't be found");
        error.status = 404
        return next(error);
    }

    const bookingObj = booking.toJSON()
    console.log("*******************", bookingObj)

    // booking user must be the user
    if (bookingObj.userId !== userId) {
        const error = new Error("Forbidden");
        error.status = 403
        return next(error);
    }

    if (end <= today) {
        const error = new Error("Past bookings can't be modified");
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

    const bookings = await Booking.findByPk(bookingId,{
        where: {
            spotId
        },
        attributes: ["startDate", "endDate"],
        raw: true
    })

    // if booking exists ...
    if (bookings.length === 0) {
        const book = await Booking.update({
            startDate, endDate, spotId, userId
        });

        return res.json(book);
    }
    // error handlers for date conflicts
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

})

module.exports = router;
