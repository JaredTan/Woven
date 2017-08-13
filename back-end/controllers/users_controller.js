const User = require('../models/user');
const Message = require('../models/message');

exports.show = function(req, res, next) {
  User.findOne({_id: req.params.user_id}, function(err, user) {
    User.findOne({email: user.partnerEmail}, function(err2, partner) {
      res.send({currentUser: user, partner: partner});
    });
  });
};

exports.update = function(req, res, next) {
  const userQuery = {_id: req.params.user_id};
  User.update(userQuery, {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    imageUrl: req.body.imageUrl,
    birthday: req.body.birthday,
    anniversary: req.body.anniversary
  }, function(err, affected, resp) {
    User.findOne({_id: req.params.user_id}, function(err, user) {
      res.send(user);
    });
  });
  const messageQuery = {"user._id": req.params.user_id.toString()};
  Message.updateMany(messageQuery, {
    "user.avatar": req.body.imageUrl
  }, () => {});
};
