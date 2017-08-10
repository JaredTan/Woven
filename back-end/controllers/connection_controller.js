const Connection = require('../models/connection');

exports.show = (req, res, next) => {
  Connection.findOne({_id: req.params.connectionId}, (err, connection) => {
    console.log(req.params.connectionId,'connection0000');
    res.json(connection);
  })
}
