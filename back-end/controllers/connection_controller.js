const Connection = require('../models/connection');

exports.show = (res, req, next) {
  Connection.findOne({_id: res.params.connectionId}, (err, connection) {
    res.json(connection);
  })
}
