const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const Message = require('./models/message');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
var router = require('./services/router');

if (process.env.NODE_ENV=='production') {
  mongoose.connect(process.env.MONGO_URL);
} else {
  mongoose.connect('mongodb://localhost:Woven/Woven');
}

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log('listening on *:3000'));

// Map sockets and users
var clients = {};
var users = {};
var sessionConnection = null;

websocket.on('connection', (socket) => {
  clients[socket.id] = socket;
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the chatroom.
function onUserJoined(userId, socket) {
  var user = User.find({ _id: userId });
  console.log(user, "user joined chat!");
  sessionConnection = user.connectionId;
  users[socket.id] = userId;
  _sendExistingMessages(socket);
}

function onMessageReceived(message, senderSocket) {
  var userId = users[senderSocket.id];
  if (!userId) return;

  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket) {
  var messages =
  Message.find({ connectionId: sessionConnection })
         .sort({ createdAt: -1 })
         .exec(function(err, messages) {
           // If there aren't any messages, then return.
           console.log(messages, "sending existing messages");
           if (!messages.length) return;
           socket.emit('message', messages);
         });
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket, fromServer) {
  var messageData = {
    text: message.text,
    userId: message.userId,
    createdAt: new Date(message.createdAt),
    connectionId: sessionConnection
  };

  console.log("creating message");
  Message.create(messageData);
  var emitter = fromServer ? websocket : socket.broadcast;
  console.log("sending created message");
  emitter.emit('message', [message]);
}

// Allow the server to participate in the chatroom through stdin.
var stdin = process.openStdin();
stdin.addListener('data', function(d) {
  _sendAndSaveMessage({
    text: d.toString().trim(),
    createdAt: new Date(),
    user: { _id: 'robot' },
    connectionId: sessionConnection
  }, null /* no socket */, true /* send from server */);
});
