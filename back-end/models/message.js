const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: {
    type: String
  },
  createdAt: {
    type: Date
  },
  userId: {
    type: String
  },
  connectionId: {
    type: String
  }

});

module.exports = mongoose.model('message', messageSchema);
