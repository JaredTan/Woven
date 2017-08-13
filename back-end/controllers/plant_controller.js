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
  (req);
  const { name, lastWater, happiness, health } = req.body.plant;
  const update = req.body.update;

  if (health > 100) {
    health = 100;
  }

  (update);

  switch(update) {
    case "NAME":
      Connection.update(plantQuery, { "plant.name": name }).exec();
      break;
    case "WATER":
      Connection.update(plantQuery, { "plant.lastWater": lastWater, "plant.health": health }).exec();
      break;
    default:
     break;
  }

  Connection.findOne({_id: req.params.connection_id}, function(err, connection) {
    res.send({
      plant: connection.plant
    });
  });
};
