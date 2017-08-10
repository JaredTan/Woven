exports.show = function(req, res, next) {
  res.json({user: req.user});
}

exports.update = function(req, res, next) {
  var user = req.user;
  user.save(function(err) {
    if (err) { return next(err) }
    res.json({});
  });
}
