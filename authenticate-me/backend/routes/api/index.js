// backend/routes/api/index.js

const router = require("express").Router();

//set token
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

//restore user
const { restoreUser } = require('../../utils/auth.js');

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

//set token
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

//restore user
router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


router.use(restoreUser);

// ...

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
