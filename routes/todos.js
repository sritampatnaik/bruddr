var express = require('express');
var router = express.Router();

// Database setup
var mongoose = require('mongoose');
var todoModel = require('../models/todo.js');

/* GET todo listing. */
router.get('/', function(req, res, next) {
  todoModel.find(function (err,todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  todoModel.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Get by name */
router.get('/name/:name', function(req, res, next) {
  todoModel.find({name: req.params.name} , function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* POST: Add todo */
router.post('/addTask', function(req,res,next) {
  todoModel.create(req.body, function (err,post) {
    if (err) return next(err);
    res.json(post)
  })
})

/* PUT: Update a task */
router.put('/:id', function(req,res,next){
  todoModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post)
  })
})

/* DELETE: Delete task */
router.delete('/:id', function(req,res,next) {
  todoModel.findByIdAndRemove(req.params.id, req.body, function (err,post) {
    if (err) return next(err);
    res.json(post)
  })
})


module.exports = router;
