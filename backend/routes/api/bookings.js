const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, SpotImage, Review, Booking, sequelize, User, ReviewImage, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateBooking = [
    check("startDate", "Please provide a start date.")
        .exists({ checkFalsy: true }),
    check("endDate", "endDate cannot be on or before startDate")
        .custom((value, { req }) => { return Date.parse(value) > Date.parse(req.body.startDate); }),
    check("endDate", "Please provide an end date.")
        .exists({ checkFalsy: true }),
    handleValidationErrors
];
//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    // find user id
    const userId = req.user.id
    console.log(userId)
    const bookings = await Booking.findAll({
        where: {userId},
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
            }, {model: User, as: "Owner" }],
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }]
    })


    for (let booking of bookings) {
        if (booking.Spot.SpotImages.length > 0) {
            booking.Spot.previewImage = booking.Spot.SpotImages[0].url
        }
    }

    for (let index = 0; index < bookings.length; index++) {
        bookings[index] = bookings[index].toJSON()
        if (bookings[index].Spot.SpotImages.length > 0) {
            bookings[index].Spot.previewImage = bookings[index].Spot.SpotImages[0].url
        } else {
            bookings[index].Spot.previewImage = null;
        }

        delete bookings[index].Spot.SpotImages
    }

    return res.json({"Bookings": bookings})
})


// edit a booking
router.put('/:bookingId', requireAuth, validateBooking, async (req, res, next) => {
    const bookingId = parseInt(req.params.bookingId)
    const { startDate, endDate } = req.body
    const userId = parseInt(req.user.id)

    const booking = await Booking.findByPk(bookingId)

    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()

    if (!booking) {
        const error = new Error("Booking couldn't be found")
        error.status = 404
        return next(error)
    }

    //booking must belong to user
    if (booking.userId !== userId) {
        const error = new Error("Forbidden");
        error.status = 403
        return next(error);
    }

    if (booking.endDate < today) {
        const error = new Error("Past bookings can't be modified");
        error.status = 403
        return next(error);
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        },
        attributes: ["startDate", "endDate"],
        raw: true
    })

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

    await booking.update({
        startDate, endDate
    });

    res.json(booking)

})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const userId = req.user.id

    const booking = await Booking.findByPk(bookingId)

    const today = new Date()

    // if booking is not found
    if (!booking) {
        const error = new Error("Booking couldn't be found")
        error.status = 404
        return next(error)
    }

    // if today is after start date, it cannot be deleted
    if (booking.startDate < today) {
        const error = new Error("Bookings that have been started can't be deleted")
        error.status = 403
        return next(error)
    }

    // can only be deleted if booking belongs to user or if spot owns to user
    const spotId = booking.spotId
    const spot = await Spot.findOne({

    })

    if (booking.userId !== userId) {
        const error = new Error("Forbidden")
        error.status = 404
        return next(error)
    }

    booking.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})

module.exports = router;
