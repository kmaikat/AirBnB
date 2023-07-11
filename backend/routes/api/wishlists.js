const express = require("express");
const { check } = require("express-validator")
const { Wishlist, WishlistItem, Spot } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth")
const router = express.Router();

const validateWishlistName = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide your wishlist with a name")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    handleValidationErrors
]

// Get all wishlists
router.get('/', async (req, res, next) => {
    const userId = parseInt(req.user.id)
    const wishlists = await Wishlist.findAll({
        where: {
            userId
        },
        include: [{
            model: WishlistItem,
            include: Spot
        }],
    })

    const wishlistsObj = wishlists.reduce((obj, item) => {
        obj[item.id] = item;
        return obj
    }, {})


    return res.json({ Wishlists: wishlists, wishlistsObj })
})

router.get('/:wishlistId', async (req, res, next) => {
    const wishlistId = req.params.wishlistId
    const userId = req.user.id

    const wishlist = await Wishlist.findByPk(wishlistId, {
        include: [{
            model: WishlistItem,
            include: Spot
        }]
    })

    if (!wishlist) {
        const error = new Error("Wishlist couldn't be found")
        error.status = 404;
        return next(error)
    }

    return res.json({wishlist})
})

// create a wishlist
router.post('/', requireAuth, validateWishlistName, async (req, res) => {
    const { name } = req.body
    const userId = req.user.id
    const newWishlist = await Wishlist.create({
        userId,
        name
    })

    res.status(201)
    return res.json(newWishlist)
})

// edit a wishlist (name)
router.put('/:wishlistId', requireAuth, validateWishlistName, async (req, res, next) => {
    const id = req.params.wishlistId
    const wishlist = await Wishlist.findByPk(id)

    if (!wishlist) {
        const error = new Error("Wishlist couldn't be found")
        error.status = 404;
        return next(error)
    }

    const { name } = req.body

    wishlist.update({
        name
    })

    return res.json(wishlist)
})

// delete a wishlist
router.delete('/:wishlistId', requireAuth, async (req, res, next) => {
    const id = req.params.wishlistId
    const wishlist = await Wishlist.findByPk(id)

    if (!wishlist) {
        const error = new Error("Wishlist couldn't be found")
        error.status = 404;
        return next(error)
    }

    await wishlist.destroy()

    return res.json({
        "message": "Wishlist deleted successfully",
        "statusCode": 200
    })
})

// add spot to wishlist
router.post('/:wishlistId/add-spot', requireAuth, async (req, res, next) => {
    const wishlistId = req.params.wishlistId
    const spotId = req.body.spotId
    const userId = req.user.id

    const wishlist = Wishlist.findByPk(wishlistId)

    if (!wishlist) {
        const error = new Error("Wishlist couldn't be found")
        error.status = 404;
        return next(error)
    }

    const existingItem = await WishlistItem.findOne({
        where: {
            spotId,
            wishlistId,
        }
    })

    if (existingItem) {
        const error = new Error("Spot is already in wishlist")
        error.status = 404;
        return next(error)
    }

    const wishlistItem = await WishlistItem.create({
        wishlistId,
        spotId,
        userId
    })


    const updatedWishlist = await Wishlist.findByPk(wishlistId, {
        include: {
            model: WishlistItem,
            include: {
                model: Spot
            }
        }
    })

    return res.json(updatedWishlist)

})

// delete a spot in wishlist
router.delete('/delete/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const wishlistItem = await WishlistItem.findOne({
        where: {
            spotId
        }
    })

    if (!wishlistItem) {
        const error = new Error("No spot found in wishlist")
        error.status = 404;
        return next(error)
    }

    await wishlistItem.destroy()

    // const wishlist = await Wishlist.findOne({
    //     where: {
    //         id: wishlistId,
    //         userId
    //     },
    //     include: {
    //         model: Spot,
    //     }
    // });

    return res.json("wishlist deleted");

})


module.exports = router;
