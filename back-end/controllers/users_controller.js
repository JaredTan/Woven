const User = require('../models/user');

exports.show = function(req, res, next) {
  User.findOne({_id: req.params.user_id}, function(err, user) {
    User.findOne({email: user.partnerEmail}, function(err, partner) {
      res.send({users: {currentUser: user, partner: partner}});
    })
  })
}

exports.index = function(req, res, next) {
  User.find({}, function(err, users) {
    res.send(users);
})
};
//
// exports.update = function(req, res, next) {
//   var user = req.user;
//   user.save(function(err) {
//     if (err) { return next(err) }
//     res.json({});
//   });
// }
