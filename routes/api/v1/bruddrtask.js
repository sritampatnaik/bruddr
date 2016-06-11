var express = require('express');
var router = express.Router();

var bruddrTask = require('./../../../models/bruddrTask');

const middleware = require('./../../../middleware')

router.get('/getAvailableTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query
  searchQuery['status'] = 0

  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

router.get('/getPendingTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query
  searchQuery['status'] = 1
  searchQuery['bruddr_name'] = req.session.currentUser

  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

router.get('/getCompletedTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query
  searchQuery['status'] = 2
  searchQuery['bruddr_name'] = req.session.currentUser

  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

module.exports = router;
