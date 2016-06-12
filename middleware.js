'use strict';
/* Middlewares */

// Check auth
const middleware = {
  isAuthenticated : function(req, res, next) {
      // do any checks you want to in here

      // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
      // you can do this however you want with whatever variables you set up
      if (req.session.currentUser) 
          return next();

      // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE TO LOGIN
      res.redirect('/user/login');
  }
}

module.exports = middleware
