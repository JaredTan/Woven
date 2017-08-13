const Connection = require('../models/connection');

exports.create = function(req, res, next) {
  Connection.findOne({_id: req.params.connectionId}, (err, connection) => {
    let text = req.body.text;
    let count = connection.todos.push({
      text: text
    });
    let _id = connection.todos[count-1]._id;
    connection.save(function(err) {
      if (err) { return next(err); }
      res.json({todo: {text: text, _id: _id}});
    })

  })
}

exports.index = function(req, res, next) {
  Connection.findOne({_id: req.params.connectionId}, (err, connection) => {
    res.json({todos: connection.todos});
  })
}

exports.destroy = function(req, res, next) {
  Connection.findOne({_id: req.params.connectionId}, (err, connection) => {
    let todoId = req.params.todoId;
    connection.todos = connection.todos.filter((todo) => {
      if (todo._id == todoId) {
        return false;
      }
      return true;
    });
    connection.save(function(err) {
      if (err) { return next(err) }
      res.json({});
    });

  })
}
