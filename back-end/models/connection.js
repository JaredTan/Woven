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
  }
});

module.exports = mongoose.model('connection', connectionSchema);
