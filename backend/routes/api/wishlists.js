const express = require("express");
const { Wishlist, WishlistItem, User } = require("../../db/models");
const router = express.Router();

router.get('/', async (req, res, next) => {
    const userId = parseInt(req.user.id)
    const wishlists = await Wishlist.findAll({
        where: {
            userId
        },
        include: {
            model: WishlistItem
        }
    })

    return res.json({Wishlists: wishlists})
})

module.exports = router;
