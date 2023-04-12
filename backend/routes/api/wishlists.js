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
        }]
    })

    return res.json({Wishlists: wishlists})
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

// add spot to wishlist

// delete a spot in wishlist


module.exports = router;
