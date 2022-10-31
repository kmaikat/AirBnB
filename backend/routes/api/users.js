const express = require('express')
const router = express.Router();


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Invalid email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// sign up a user
router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  try {
    const user = await User.signup({ email, username, password, firstName, lastName });
    // await setTokenCookie(res, user);

    const token = await setTokenCookie(res, user)


    const currentUser = {
      id: user.id,
      firstName,
      lastName,
      email,
      username,
      token
    }

    return res.json(currentUser);
  } catch (error) {
    const err = new Error();
    res.status(403)
    err.message = "User already exists"
    err.statusCode = 403;
    err.errors = {
      [`${error.errors[0].path}`]: `User with that ${error.errors[0].path} already exists`
    }
    res.json(err)
  }
}
);



module.exports = router;
