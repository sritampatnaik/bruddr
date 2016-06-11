var express = require('express');
var router = express.Router();

var bruddrTask = require('./../../../models/bruddrTask');

const middleware = require('./../../../middleware')

router.get('/getAvailableTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query

  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

module.exports = router;
