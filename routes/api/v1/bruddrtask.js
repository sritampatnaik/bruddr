var express = require('express');
var router = express.Router();

var bruddrTask = require('./../../../models/bruddrTask');

const middleware = require('./../../../middleware')

router.get('/getTasks', middleware.isAuthenticated, function(req,res,next) {
  // Get the params for the query
  var searchQuery = req.query
  // Check if it's a non-generic query (not just available tasks)
  if (req.query.status > 0) {
    searchQuery['bruddr_id'] = req.session.currentUserID
  }
  bruddrTask.find(searchQuery , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
})

router.get('/takeTask/:id', middleware.isAuthenticated, function(req,res,next) {
  const id = req.params.id
  bruddrTask.findOne({_id: id}, function (err, task) {
    task.bruddr_id = req.session.currentUserID
    task.status = 1
    
    task.save(function (err) {
      if(err) console.error('ERROR!');
      res.json(task);
    });
  });
})

router.get('/markAsComplete/:id', middleware.isAuthenticated, function(req,res,next) {
  const id = req.params.id
  bruddrTask.findOne({_id: id}, function (err, task) {
    task.status = 2
    
    task.save(function (err) {
      if(err) console.error('ERROR!');
      res.json(task);
    });
  });
})

module.exports = router;
