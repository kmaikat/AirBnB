// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
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
router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      ...user.toSafeObject()
    });
  } else return res.json({});
});



router.post('/', validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    // err.title = 'Login failed';
    // err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  // if there is no user name
  //"credential": "Email or username is required",
  // "password": "Password is required"

  const token = await setTokenCookie(res, user);

  const response = user.toSafeObject()
  response.token = token;
  return res.json(response);
}
);

// router.get('/', requireAuth, async (req,res, next) => {

// })

module.exports = router;
