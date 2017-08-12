const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: {
    type: String
  },
  createdAt: {
    type: Date
  },
  user: {
    _id: {
      type: String
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    connectionId: {
      type: String
    }
  },

});

module.exports = mongoose.model('message', messageSchema);
