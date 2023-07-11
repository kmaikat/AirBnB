// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, WishlistItem, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];

// Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

// Restore session user
router.get('/', restoreUser, async (req, res) => {
  const { user } = req;
  if (user) {
    const wishlistItems = await WishlistItem.findAll({
      where: {
        userId: user.id
      },
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("spotId")), "spotId"]],
      raw: true
    })

    const savedSpots = wishlistItems.reduce((obj, item) => {
      obj[item.spotId] = item.spotId
      return obj
    }, {})

    return res.json({
      user: {
        ...user.toSafeObject(),
        savedSpots
      }
    }
    );
  } else return res.json({ user: null});
});



router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  // if there is no user name
  //"credential": "Email or username is required",
  // "password": "Password is required"

  const token = await setTokenCookie(res, user);

  const response = user.toSafeObject()
  const wishlistItems = await WishlistItem.findAll({
    where: {
      userId: user.id
    },
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("spotId")), "spotId"]],
    raw: true
  })

  const savedSpots = wishlistItems.reduce((obj, item) => {
    obj[item.spotId] = item.spotId
    return obj
  }, {})
  response.token = token;
  return res.json({ user: response, savedSpots });
}
);

module.exports = router;
