var express = require('express');
var router = express.Router();

/* GET default page. */
router.get('/', function(req, res, next) {
  if (req.session.currentUser) {
    res.render('home', { 
      username: req.session.currentUser,
      selected: 0,
    });
  } else {
    res.render('index', { username: null });
  }
});

/* GET logged in home page. */
router.get('/home', function(req, res, next) {
  if (req.session.currentUser) {
    res.render('home', { 
      username: req.session.currentUser,
      selected: 0,
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
