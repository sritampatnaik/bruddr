var express = require('express');
var router = express.Router();

var bruddrTask = require('./../models/bruddrTask');

const middleware = require('./../middleware')

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
router.get('/home', middleware.isAuthenticated, function(req, res, next) {
  
  /* Get this user pending tasks */
  const searchQuery = {
    bruddr_name: req.session.currentUser
  }
  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.render('home', { 
      username: req.session.currentUser,
      pendingTasks: post,
      selected: 0,
    });
  });
});

module.exports = router;
