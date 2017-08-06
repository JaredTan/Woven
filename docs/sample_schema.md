```javascript
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const User = new Schema({
    userName            : ObjectId,
    firstName           : String,
    lastName            : String,
    email               : String,
    gender              : String,
    profileImageUrl     : String,
    birthDate           : Date,
    anniversary         : Date,
    timeStamp           : Date,
    connections         : ObjectId,
});


Connection will contain:

const Message = new Schema({
  author          : { type: String, default: 'hahaha' },
  body            : { type: Abstract, min: 18, index: true },
  time            : { type: Date, default: Date.now },
  date            : { type: Date, default: Date.now },
  timeStamp       : { type: Date, default: Date.now }
});

const Plant = new Schema({
  name            : { type: String, default: ‘Plant’ },
  type            : { type: String, default: ‘Plant’ },
  age             : Date,
  description     : String,
  health          : { type: Integer, default: 100 },
  happiness       : { type: Integer, default: 100 },
  timeStamp       : { type: Date, default: Date.now }
});

const Todo = new Schema({
  title           : { type: String, default: ‘Plant’ },
  body            : { type: String, default: ‘Plant’ },
  author          : String,
  status          : String,
  timeStamp       : { type: Date, default: Date.now }
});

const Activity = new Schema({
  title           : { type: String, default: 'New Activity' },
  description     : String,
  author          : String,
  location        : String,
  activityDate    : String,
  timeStamp       : { type: Date, default: Date.now }
});

```