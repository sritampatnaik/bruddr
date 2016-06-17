var express = require('express');
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');
var parser = require('xml2json');
var router = express.Router();
var messengerMessage = require('./../../../models/messengerMessage');
var bruddrTask = require('./../../../models/bruddrTask');
var extract = require('pdf-text-extract');


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
const wit = new Wit(process.env.witServerAccessToken, actions);

// Database setup
var mongoose = require('mongoose');

// @mark: Replace this with your messenger model
// var todoModel = require('../models/todo.js');

/* GET todo listing. */
router.get('/', function(req, res) {
  if (req.query['hub.verify_token'] === 'bruddr') {
    res.send(req.query['hub.challenge']);
  } else {
      res.send('Error, wrong validation token');
  }
});

router.post('/', function (req, res) {
  var messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;

    // Do not do anything if there's no message #HACK
    if (!messaging_events[i].message) continue
    
    bruddrTask.findOne({'owner_id': sender, 'status': 0}, 'type description status', function (err, task) {
      if (err) return console.log(err);
      else {
        if(task) {
          if(task.type == 'logo') {
            if (task.description == "none") {
              var reply = 'Can you send us more details about your the logo ?'; 
              sendTextMessage(sender, reply);
              task.description = 'Design a mickey mouse logo.';
              task.save();
            } else if (event.message && event.postback) {
              console.log("postback");
              var reply = 'Your logo has been selected.'; 
              sendTextMessage(sender, reply);
            } else if (task.description != "none") {
              var reply = 'Here are some of the designs created by our bruddrs.'; 
              sendTextMessage(sender, reply);
              sendGenericMessage(sender);
              task.status = 1;
              task.save();
            } else {
              console.log('no message');
            }
          } 
        } else {
          if (event.message && event.message.text) {
            witUnderstandText(event.message.text, sender);
          } else if(event.message &&  event.message.attachments) {
              var atts = event.message.attachments;
              if(atts[0].type === "file"){
                var fileURL = atts[0].payload.url;
                var timestamp = new Date().getUTCMilliseconds();
                var folder = './uploads/' + sender;
                var filename = sender + '_' + timestamp + '.pdf';
                var filePath = folder + "/" + filename;

                download(fileURL, folder, filename, function(){
                  extract(filePath, function (err, pages) {
                    if (err) {
                      console.dir(err);
                      return
                    }
                    request.post({
                      url:'http://rezscore.com/a/a57b97/grade', 
                      form: {resume:pages}
                    }, function(err,httpResponse,body){
                        if (err) {
                          console.log('Error rez score', error);
                        } else {
                          var resumeResultString = parser.toJson(body);
                          var resumeResultObj = JSON.parse(resumeResultString);

                          console.log(resumeResultObj.rezscore);

                          var reply = resumeResultObj.rezscore.score.grade + "\n" + resumeResultObj.rezscore.score.grade_headline + "\n" + resumeResultObj.rezscore.score.grade_blurb; 
                          sendTextMessage(sender, reply);
                        } 
                    });
                  });
                });
              }
            } else {
            console.log("no message");
          }
        }
      }
    });
    
    // if (event.postback) {
    //   var text = JSON.stringify(event.postback)
    //   sendTextMessage(sender, "Postback received: "+text.substring(0, 200))
    // }

    // messengerMessage.create(message, function (err,post) {     
    //   if (err) return console.log(err);
    // });
          // This code is for the resume score checking
          // else if(event.message.attachments) {
          //     var atts = event.message.attachments;
          //     if(atts[0].type === "file"){
          //       var fileURL = atts[0].payload.url;
          //       var timestamp = new Date().getUTCMilliseconds();
          //       var folder = './uploads/' + sender;
          //       var filename = sender + '_' + timestamp + '.pdf';
          //       var filePath = folder + "/" + filename;

          //       download(fileURL, folder, filename, function(){
          //         extract(filePath, function (err, pages) {
          //           if (err) {
          //             console.dir(err);
          //             return
          //           }
          //           request.post({
          //             url:'http://rezscore.com/a/a57b97/grade', 
          //             form: {resume:pages}
          //           }, function(err,httpResponse,body){
          //               if (err) {
          //                 console.log('Error rez score', error);
          //               } else {
          //                 var resumeResultString = parser.toJson(body);
          //                 var resumeResultObj = JSON.parse(resumeResultString);

          //                 console.log(resumeResultObj.rezscore);

          //                 var reply = resumeResultObj.rezscore.score.grade + "\n" + resumeResultObj.rezscore.score.grade_headline + "\n" + resumeResultObj.rezscore.score.grade_blurb; 
          //                 sendTextMessage(sender, reply);
          //               } 
          //           });
          //         });
          //       });
          //     }
          //   } 

  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:process.env.fbtoken},
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
    sendTextMessage(sender, "Sure we will find a bruddr to help you with your logo");
  } else if (taskData.entities.task[0].value == "summary") {
    sendTextMessage(sender, "You need help with a summary.");
  } else if (taskData.entities.task[0].value == "resume") {
    sendTextMessage(sender, "You need a bruddr to design your resume.");
  }
  if(task) {
    var task = {
      title: "This is a " + taskData.entities.task[0].value + " task." ,
      type: taskData.entities.task[0].value,
      description: "none",
      owner_id: sender,
      owner_name: 'Sritam Patnaik',
      price: 29,
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
          "title": "Designed By:",
          "subtitle": "Melinda Wang",
          "image_url": "http://cliparts.co/cliparts/pi5/rBX/pi5rBXpdT.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://cliparts.co/cliparts/pi5/rBX/pi5rBXpdT.jpg",
            "title": "View Full Image"
          }, {
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Contact Designer"
          }, {
            "type": "postback",
            "title": "Select: Sample 1",
            "payload": "Payload for first element in a generic bubble",
          }],
        },{
          "title": "Designed By:",
          "subtitle": "Samuel Cho",
          "image_url": "http://cliparts.co/cliparts/ki8/5Rn/ki85Rnr8T.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://cliparts.co/cliparts/ki8/5Rn/ki85Rnr8T.jpg",
            "title": "View Full Image"
          }, {
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Contact Designer"
          },{
            "type": "postback",
            "title": "Select: Sample 2",
            "payload": "Payload for second element in a generic bubble",
          }],
        },{
          "title": "Designed by:",
          "subtitle": "John Ive",
          "image_url": "http://cliparts.co/cliparts/8i6/8Rp/8i68RpaBT.png",
          "buttons": [{
            "type": "web_url",
            "url": "http://cliparts.co/cliparts/8i6/8Rp/8i68RpaBT.png",
            "title": "View Full Image"
          }, {
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Contact Designer"
          },{
            "type": "postback",
            "title": "Select: Sample 3",
            "payload": "Payload for second element in a generic bubble",
          }],
        }]
      }
    }
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:process.env.fbtoken},
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
