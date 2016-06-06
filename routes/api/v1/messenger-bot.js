var express = require('express');
var request = require('request');
var router = express.Router();
var messengerMessage = require('./../../../models/messengerMessage')

// Database setup
var mongoose = require('mongoose');

// Credentials
const credentials = include('config/credentials');


// @mark: Replace this with your messenger model
// var todoModel = require('../models/todo.js');

/* GET todo listing. */
router.get('/', function(req, res) {
  if (req.query['hub.verify_token'] === 'bruddr') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

router.post('/', function (req, res, err) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    var message = {
        message: event.message.text,
        sender_id: sender
      }
    messengerMessage.create(message, function (err,post) {     
      if (err) return console.log(err);
      console.log(post);
    })
    if (event.message && event.message.text) {
      text = event.message.text;
      sendTextMessage(sender, text);
      console.log(text);
    }
  }

  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  var messageData = {
    text: "Hello there you said this:" + text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:credentials.fbtoken},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

module.exports = router;
