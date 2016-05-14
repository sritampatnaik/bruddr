var express = require('express');
var router = express.Router();

// Database setup
var mongoose = require('mongoose');
// @mark: Replace this with your messenger model
var betaEmailModel = require('./../../../models/betaEmail')

/* GET ALL emails collected. */
router.get('/', function(req, res, next) {
  betaEmailModel.find(function (err,todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST: Add Email */
router.post('/addEmail', function(req,res,next) {
  betaEmailModel.create(req.body, function (err,post) {
    if (err) return next(err);
    res.json(post)
  })
})


module.exports = router;
