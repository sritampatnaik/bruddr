var express = require('express');
var router = express.Router();

// Database setup
var mongoose = require('mongoose');
// @mark: Replace this with your messenger model
// var todoModel = require('../models/todo.js'); 

/* GET todo listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is the messenger bot init!' });
});


module.exports = router;
