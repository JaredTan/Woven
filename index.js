const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./back-end/models/user');
const Message = require('./back-end/models/message');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
var router = require('./back-end/services/router');

if (process.env.NODE_ENV=='production') {
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://localhost:Woven/Woven');
}

// var API_URL = 'https://safe-peak-55084.herokuapp.com/v1';

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 3000;

console.log('listening on', PORT);
server.listen(PORT);

var sessionConnection = null;
websocket.on('connection', (socket) => {
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));
});


function onUserJoined(userId, socket) {
  var objId = mongoose.Types.ObjectId(userId);
  User.findOne({_id: objId}, (err, user) => {

    sessionConnection = user.connectionId;
    socket.join(user.connectionId);
    _sendExistingMessages(socket);
  });
}

function onMessageReceived(message, senderSocket) {
  _sendAndSaveMessage(message, senderSocket);
}

function _sendExistingMessages(socket) {
  Message.find({ "user.connectionId": sessionConnection })
         .sort({ createdAt: -1})
         .exec(function(err, messages) {
            socket.emit('message', messages);
         });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket) {
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt),
  };

  var connectionId = message.user.connectionId;

  Message.create(messageData, (err, newMessage) => {
    socket.broadcast.to(connectionId).emit('message', [newMessage]);
  });
}
