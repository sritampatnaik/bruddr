var express = require('express');
var router = express.Router();

var bruddrTask = require('./../models/bruddrTask');

const middleware = require('./../middleware')

/**************** RENDERS ****************/

/* GET browse page */
router.get('/browse', middleware.isAuthenticated, function(req, res, next) {
  res.render('task/browse', { 
    username: req.session.currentUser,
    selected: 1,
  });
});

module.exports = router;
