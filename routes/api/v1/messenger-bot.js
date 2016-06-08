var express = require('express');
var request = require('request');
var router = express.Router();
var messengerMessage = require('./../../../models/messengerMessage');

// Credentials
const credentials = include('config/credentials');

//This is wir specific code
const Wit = require('node-wit').Wit;

// Wit.ai bot specific code
// Our bot actions
const actions = {
  say(sessionId, context, message, cb) {
    console.log(message);
    cb();
  },
  merge(sessionId, context, entities, message, cb) {
    cb(context);
  },
  error(sessionId, context, error) {
    console.log(error.message);
  },
  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
};

// Setting up our bot
const wit = new Wit(credentials.witServerAccessToken, actions);

// Database setup
var mongoose = require('mongoose');

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
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    
    if (event.postback) {
        var text = JSON.stringify(event.postback)
        sendTextMessage(sender, "Postback received: "+text.substring(0, 200))
      }

    if (event.message && event.message.text) {
      var message = {
        message: event.message.text,
        sender_id: sender
      }
      messengerMessage.create(message, function (err,post) {     
        if (err) return console.log(err);
      });
      var text = event.message.text;
      witUnderstandText(text, sender);
      sendGenericMessage(sender);
    }
  }

  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
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

function determineTask(taskData, sender) {
  var task = taskData.entities.task;
  if(!task){
    console.log("Sorry could you be more specific ?");
    sendTextMessage(sender, "Sorry could you be more specific ?");
  } else if (taskData.entities.task[0].value == "print") {
    sendTextMessage(sender, "You want to print stuff.");
  } else if (taskData.entities.task[0].value == "delivery") {
    sendTextMessage(sender, "You want to deliver something.");
  } else if (taskData.entities.task[0].value == "logo") {
    sendTextMessage(sender, "You need help with a logo.");
  } else if (taskData.entities.task[0].value == "summary") {
    sendTextMessage(sender, "You need help with a summary.");
  } else if (taskData.entities.task[0].value == "resume") {
    sendTextMessage(sender, "You need a bruddr to design your resume.");
  }
}

function sendGenericMessage(sender) {
  messageData = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "First card",
          "subtitle": "Element #1 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Web url"
          }, {
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for first element in a generic bubble",
          }],
        },{
          "title": "Second card",
          "subtitle": "Element #2 of an hscroll",
          "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
          "buttons": [{
            "type": "postback",
            "title": "Postback",
            "payload": "Payload for second element in a generic bubble",
          }],
        }]
      }
    }
  };
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

function witUnderstandText(text, sender){
  const context = {};
  wit.message(text, context, (error, data) => {
    if (error) {
      console.log('Oops! Got an error: ' + error);
    } else {
      determineTask(data, sender);
      console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
    }
  });
}

module.exports = router;
