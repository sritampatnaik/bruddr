var express = require('express');
var router = express.Router();
var passport = require('passport');
var bCrypt = require('bcrypt-nodejs');
var UserModel = require('../models/user')

module.exports = function(){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('user/login', { message: '' });
	});
  
  /* Pseduo logic using self logic stuff */
  router.post('/login', function(req, res) {
    UserModel.find({username : req.body.username}, function (err, docs) {
        if (docs.length){ // username found
          console.log(docs[0].password)
          bCrypt.compare(req.body.password, docs[0].password, function(err, _res) {
            if (_res) {
              // logic successful
              // Redirect to splash page
              res.json(docs)
            } else {
              res.render('user/login', { message: 'Password Incorrect' });
            }
          });
        }else{
          res.render('user/login', { message: 'Username not found' });
        }
    });
  });

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('user/signup',{message: ''});
	});
  
  /* Pseduo signup using self logic stuff */
  router.post('/signup', function(req, res) {
    var payload = req.body
    var cryptedPW = bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(10), null);
    payload.password = cryptedPW;
    UserModel.find({username : payload.username}, function (err, docs) {
        if (docs.length){
          res.render('user/signup',{message: 'Username is already taken'});
        }else{
          UserModel.create(payload, function (err,post) {
            if (err) return next(err);
            res.json(post)
            // Redirect to splash page
          })
        }
    });
  });
  
  /* Real login using passport
  // Handle Login POST
  router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/user/login', 
    failureFlash : true  
  }));
  
	// Handle Registration POST
	router.post('/api/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/user/signup',
		failureFlash : true  
	}));
  */

	/* Handle Logout */
	router.get('/api/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
