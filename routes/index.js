var express = require('express');
var router = express.Router();

var bruddrTask = require('./../models/bruddrTask');
var UserModel = require('./../models/user')

const middleware = require('./../middleware')

/* GET default page. */
router.get('/', function(req, res, next) {
  if (req.session.currentUser) {
    res.redirect('/home');
  } else {
    res.render('index', { username: null });
  }
});

/* GET logged in home page. */

/* TODO: TIME TO REFACTOR INTO JAVASCRIPT CLOSURE / MODELS FOR EACH OBJECT */
router.get('/home', middleware.isAuthenticated, function(req, res, next) {
  UserModel.find({_id : req.session.currentUserID}, function (err, post) {
    if (err) return next(err);
    const _balance = post[0].balance
    const pendingQuery = {
      status: 1,
      bruddr_id: req.session.currentUserID
    }
    bruddrTask.find(pendingQuery , function (err, post) {
      if (err) return next(err);
      const _pendingTaskCount = post.length
      console.log('pending:')
      console.log(post)
      const completedQuery = {
        status: 2,
        bruddr_id: req.session.currentUserID
      }
      bruddrTask.find(completedQuery , function (err, post) {
        if (err) return next(err);
        console.log('completed:')
        console.log(post)
        const _completedTaskCount = post.length
        res.render('home', { 
          username: req.session.currentUser,
          balance: _balance,
          pendingTasks: _pendingTaskCount,
          completedTasks: _completedTaskCount,
          selected: 0,
        });

      });

    });
  });

  
  /* Get this user pending tasks (deprecated maybe) 
  
  */
});

module.exports = router;
