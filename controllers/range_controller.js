import * as Range from '../models/range_model'

exports.create = (req, res) => {
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

  Range.create(range, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Range.'
      });
    else res.send(data);
  });
};

// Leggere gli Intervalli
exports.findAll = (req, res) => {
  const filters = {
    goal: req.query.goal,
    start_date: req.query.start_date,
    end_date: req.query.end_date
  };

  Range.getAll(filters, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving ranges.'
      });
    else res.send(data);
  });
};

// Leggere un Intervallo
exports.findOne = (req, res) => {
  Range.findById(req.params.rangeId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Range with id ${req.params.rangeId}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Range with id ' + req.params.rangeId
        });
      }
    } else res.send(data);
  });
};

// Modificare un Intervallo
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  Range.updateById(
    req.params.rangeId,
    new Range(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Range with id ${req.params.rangeId}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating Range with id ' + req.params.rangeId
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminare un Intervallo
exports.delete = (req, res) => {
  Range.remove(req.params.rangeId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Range with id ${req.params.rangeId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Range with id ' + req.params.rangeId
        });
      }
    } else res.send({ message: `Range was deleted successfully!` });
  });
};