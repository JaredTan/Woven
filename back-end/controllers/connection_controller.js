const Connection = require('../models/connection');

exports.show = (req, res, next) => {
  Connection.findOne({_id: req.params.connectionId}, (err, connection) => {
    res.json(connection);
  })
}
