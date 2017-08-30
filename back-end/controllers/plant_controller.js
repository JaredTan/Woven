const Connection = require('../models/connection');

exports.show = function(req, res, next) {
  Connection.findOne({_id: req.params.connectionId}, function(err, connection) {
    res.send({
      plant: connection.plant
    });
  });
};

exports.update = function(req, res, next) {
  const plantQuery = {_id: req.params.connectionId};

  console.log("THE NEW PLANT", req.body.plantObj);

  Connection.update(plantQuery, {
    plant: req.body.plantObj
  }).then((err) => {
    Connection.findOne({_id: req.params.connectionId}, function(err, connection) {
      res.send({
        plant: connection.plant
      });
    });
  });

};
