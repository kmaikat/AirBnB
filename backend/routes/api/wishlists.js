const express = require("express");
const { Wishlist, WishlistItem, Spot, User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

const validateWishlistName = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Please provide your wishlist with a name")
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters")
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
router.post('/', validateWishlistName, async (req, res, next) => {

})

// edit a wishlist (name)

// delete a wishlist

// add spot to wishlist

// delete a spot in wishlist


module.exports = router;
