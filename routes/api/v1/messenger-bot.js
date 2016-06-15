var express = require('express');
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var parser = require('xml2json');
var router = express.Router();
var messengerMessage = require('./../../../models/messengerMessage');
var bruddrTask = require('./../../../models/bruddrTask');



var download = function(uri, dir, filename, callback){
  var folderPlusName = dir + '/' + filename;

  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    if (!fs.existsSync(dir)){
        mkdirp(dir, function (err) {
            if (err) console.error(err)
            else     
              request(uri).pipe(fs.createWriteStream(folderPlusName)).on('close', callback);

        });
    } else {
        request(uri).pipe(fs.createWriteStream(folderPlusName)).on('close', callback);
    }
  });
};

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
    var atts = event.message.attachments;

    // if (event.postback) {
    //   var text = JSON.stringify(event.postback)
    //   sendTextMessage(sender, "Postback received: "+text.substring(0, 200))
    // }

    // if (atts) {
    //   // We received an attachment
    //   console.log(atts);
    //   if(atts[0].type === "image"){
    //     var imageURL = atts[0].payload.url;
    //     var timestamp = new Date().getUTCMilliseconds();
    //     var folder = './uploads/' + sender;
    //     var filename = sender + '_' + timestamp + '.png'

    //     download(imageURL, folder, filename, function(){console.log('done');});

    //   }
    // }
  
    if (event.message && event.message.text) {
      var message = {
        message: event.message.text,
        sender_id: sender
      }

      messengerMessage.create(message, function (err,post) {     
        if (err) return console.log(err);
      });

      var text = event.message.text;
      

      // find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
      // bruddrTask.findOne({ 'owner_id': sender }, 'type', function (err, task) {
      //   if (err) return handleError(err);
      //   else {
      //     if(task) {
      //       var reply = 'Can you send us more details about your requirements ?'; 
      //       sendTextMessage(sender, reply);
      //       console.log(task.type);
      //     } else {
      //       witUnderstandText(text, sender);
      //     }
      //   }
      // });

      
      // sendGenericMessage(sender);
      // request.post({
      //   url:'http://rezscore.com/a/a57b97/grade', 
      //   form: {resume:'value'}
      // }, function(err,httpResponse,body){
      //     if (err) {
      //       console.log('Error rez score', error);
      //     } else {
      //       console.log(parser.toJson(body));
      //     } 
      // });
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
  if(task) {
    var task = {
      title: "This is a " + taskData.entities.task[0].value + " task." ,
      type: taskData.entities.task[0].value,
      description: taskData._text,
      owner_id: sender,
      price: 0,
      status: 0,
    }
    bruddrTask.create(task, function (err,post) {     
      if (err) return console.log(err);
      else console.log("success");
    });
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
