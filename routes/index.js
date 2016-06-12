var express = require('express');
var router = express.Router();

var bruddrTask = require('./../models/bruddrTask');
var UserModel = require('./../models/user')

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
  UserModel.find({_id : req.session.currentUserID}, function (err, post) {
    if (err) return next(err);
    res.render('home', { 
      username: req.session.currentUser,
      balance: post[0].balance,
      selected: 0,
    });
  });
  
  
  /* Get this user pending tasks (deprecated maybe) 
  const searchQuery = {
    status: 1,
    bruddr_id: req.session.currentUserID
  }
  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.render('home', { 
      username: req.session.currentUser,
      pendingTasks: post,
      selected: 0,
    });
  });
  */
});

module.exports = router;
