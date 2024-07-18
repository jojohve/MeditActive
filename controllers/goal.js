import * as Goal from '../models/goal.js'

export const create = async (req, res) => {
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

  try {
    const data = await goal.create();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Goal.'
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const data = await Goal.getAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving goals.'
    });
  }
};

// Leggere gli ObiettivI
export const findOne = async (req, res) => {
  try {
    const data = await Goal.findById(req.params.goalId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Goal with id ${req.params.goalId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error retrieving Goal with id ' + req.params.goalId
      });
    }
  }
};

// Modificare un Obiettivo
export const update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  const goal = new Goal(req.body);

  try {
    const data = await goal.updateById(req.params.goalId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Goal with id ${req.params.goalId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error updating Goal with id ' + req.params.goalId
      });
    }
  }
};

// Eliminare un Obiettivo
export const remove = async (req, res) => {
  try {
    await Goal.remove(req.params.goalId);
    res.send({ message: `Goal was deleted successfully!` });
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Goal with id ${req.params.goalId}.`
      });
    } else {
      res.status(500).send({
        message: 'Could not delete Goal with id ' + req.params.goalId
      });
    }
  }
};