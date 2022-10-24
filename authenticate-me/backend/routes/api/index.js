const router = require("express").Router();

//restore user
const { restoreUser } = require('../../utils/auth.js');

//restore user
router.use(restoreUser);

module.exports = router;
