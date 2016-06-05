var express = require('express');
var router = express.Router();

/* GET browse page */
router.get('/browse', function(req, res, next) {
  if (req.session.currentUser) {
    res.render('task/browse', { username: req.session.currentUser });
  } else {
    res.redirect('/user/login');
  }
});

module.exports = router;
