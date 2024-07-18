import * as Range from '../models/range.js'

export const create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Creare un Intervallo
  const range = new Range({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    user_id: req.body.user_id
  });

  try {
    const data = await range.create();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Range.'
    });
  }
};

// Leggere gli Intervalli
export const findAll = async (req, res) => {
  const filters = {
    goal: req.query.goal,
    start_date: req.query.start_date,
    end_date: req.query.end_date
  };

  try {
    const data = await Range.getAll(filters);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving ranges.'
    });
  }
};

// Leggere un Intervallo
export const findOne = async (req, res) => {
  try {
    const data = await Range.findById(req.params.rangeId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Range with id ${req.params.rangeId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error retrieving Range with id ' + req.params.rangeId
      });
    }
  }
};

// Modificare un Intervallo
export const update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  const range = new Range(req.body);

  try {
    const data = await range.updateById(req.params.rangeId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Range with id ${req.params.rangeId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error updating Range with id ' + req.params.rangeId
      });
    }
  }
};

// Eliminare un Intervallo
export const remove = async (req, res) => {
  try {
    await Range.remove(req.params.rangeId);
    res.send({ message: `Range was deleted successfully!` });
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found Range with id ${req.params.rangeId}.`
      });
    } else {
      res.status(500).send({
        message: 'Could not delete Range with id ' + req.params.rangeId
      });
    }
  }
};