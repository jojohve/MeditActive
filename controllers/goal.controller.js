const Goal = require('../models/goal.model');

// Create and Save a new Goal
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create a Goal
  const goal = new Goal({
    goal: req.body.goal,
    range_id: req.body.range_id
  });

  // Save Goal in the database
  Goal.create(goal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Goal.'
      });
    else res.send(data);
  });
};

// Retrieve all Goals from the database.
exports.findAll = (req, res) => {
  Goal.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving goals.'
      });
    else res.send(data);
  });
};

// Find a single Goal with a goalId
exports.findOne = (req, res) => {
  Goal.findById(req.params.goalId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Goal with id ${req.params.goalId}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Goal with id ' + req.params.goalId
        });
      }
    } else res.send(data);
  });
};

// Update a Goal identified by the goalId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  Goal.updateById(
    req.params.goalId,
    new Goal(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Goal with id ${req.params.goalId}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating Goal with id ' + req.params.goalId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Goal with the specified goalId in the request
exports.delete = (req, res) => {
  Goal.remove(req.params.goalId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Goal with id ${req.params.goalId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Goal with id ' + req.params.goalId
        });
      }
    } else res.send({ message: `Goal was deleted successfully!` });
  });
};