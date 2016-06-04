var express = require('express');
var router = express.Router();
var passport = require('passport');

module.exports = function(){

	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('user/login', { message: req.flash('message') });
	});

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('user/signup',{message: req.flash('message')});
	});
  
  /* Handle Login POST */
  router.post('/api/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login', 
    failureFlash : true  
  }));
  
	/* Handle Registration POST */
	router.post('/api/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* Handle Logout */
	router.get('/api/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}
