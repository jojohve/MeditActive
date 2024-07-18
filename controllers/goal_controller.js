import * as Goal from '../models/goal_model'

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Creare un Obiettivo
  const goal = new Goal({
    goal: req.body.goal,
    range_id: req.body.range_id
  });

  Goal.create(goal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Goal.'
      });
    else res.send(data);
  });
};

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

// Leggere gli ObiettivI
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

// Modificare un Obiettivo
exports.update = (req, res) => {
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

// Eliminare un Obiettivo
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