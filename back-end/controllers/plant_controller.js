const Connection = require('../models/connection');

exports.show = function(req, res, next) {
  Connection.findOne({_id: req.params.connection_id}, function(err, connection) {
    res.send({
      plant: connection.plant
    });
  });
};

exports.update = function(req, res, next) {
  const plantQuery = {_id: req.params.connection_id};
  const plant = req.body.plant;
  const update = req.body.update;

  if (plant.health > 100) {
    plant.health = 100;
  }

  Connection.update(plantQuery, { plant }).exec();

  Connection.findOne({_id: req.params.connection_id}, function(err, connection) {
    res.send({
      plant: connection.plant
    });
  });
};
