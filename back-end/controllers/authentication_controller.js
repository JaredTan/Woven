const User = require('../models/user');
const Connection = require('../models/connection');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

exports.signin = function(req, res, next) {
  var user = req.user;
  res.send({token: tokenForUser(user), user_id: user._id, connectionId: user.connectionId});
}

exports.signup = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var partnerEmail = req.body.partnerEmail;
  if (!email || !password) {
    return res.status(422).json({error: "You must provide an email and password"});
  }

  User.findOne({email: email}, function(err, existingUser) {
    if (err) { return next(err) }
    if (existingUser) {return res.status(422).json({error: "Email taken"})}
    var user = new User({
      email: email,
      password: password,
      partnerEmail: partnerEmail,
      connectionId: null,
      firstName: firstName,
      lastName: lastName,
      imageUrl: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg',
      birthday: null
    });
    user.save(function(err) {
      if (err) { return next(err) }
      res.json({user_id: user._id, token: tokenForUser(user)});
    });
    User.findOne( {email: user.partnerEmail}, (err, partner) => {
      if (partner && partner.partnerEmail === user.email) {
        let newConnection = new Connection();
        newConnection.save();
        const userQuery = {email: user.email};
        User.update(userQuery, {
          connectionId: newConnection._id
        }, function(err, affected, resp) {
        });
        const partnerQuery = {email: user.partnerEmail};
        User.update(partnerQuery, {
          connectionId: newConnection._id
        }, function(err, affected, resp) {
        });
      } else if (partner && partner.partnerEmail !== user.email) {
        return res.status(422).json({error: "That user is already paired."})
      }
    });
  });
}
