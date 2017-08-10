const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var connectionSchema = new Schema({
  todos: [
    {
      text: {type: String}
    }
  ],
  plant: {
    name: {type: String},
    health: {type: Number},
    happiness: {type: Number},
    age: {type: Number},
  },
  messages: [
    {
      text: {
        type: String
      },
      createdAt: {
        type: Date
      },
      userId: {
        type: Number
      }
    }
  ]
});

module.exports = mongoose.model('connection', connectionSchema);
