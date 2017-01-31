const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');

/* GET user profile page. */
// add route here
router.get('/', authHelpers.loginRequired, (req, res, next) => {
  res.render('user/index', {
    user: req.user.dataValues
//if someone is trying to log in - call function from ../auth/auth-helpers to check password, if succes - render user/index page
  });
});




module.exports = router;
