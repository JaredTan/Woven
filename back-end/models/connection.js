const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var connectionSchema = new Schema({
  todos: [
    {
      text: {type: String}
    }
  ],
  plant: {
    name: {type: String, default: 'Greggles'},
    health: {type: Number, default: 75},
    happiness: {type: Number, default: 75},
    age: {type: Number, default: 0},
    seeded: { type: Date, default: Date.now() },
    lastWater: { type: Date, default: Date.now() }
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
