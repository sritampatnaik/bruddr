var express = require('express');
var router = express.Router();

var bruddrTask = require('./../../../models/bruddrTask');

const middleware = require('./../../../middleware')

router.get('/getTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query
  // Check if it's a non-generic query (not just available tasks)
  if (req.query.status > 0) {
    searchQuery['bruddr_name'] = req.session.currentUser
  }

  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

module.exports = router;
