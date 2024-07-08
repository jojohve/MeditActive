const Range = require('../models/range.model');

// Create and Save a new Range
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Create a Range
  const range = new Range({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    user_id: req.body.user_id
  });

  // Save Range in the database
  Range.create(range, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Range.'
      });
    else res.send(data);
  });
};

// Retrieve all Ranges from the database.
exports.findAll = (req, res) => {
  Range.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving ranges.'
      });
    else res.send(data);
  });
};

// Find a single Range with a rangeId
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

// Update a Range identified by the rangeId in the request
exports.update = (req, res) => {
  // Validate Request
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

// Delete a Range with the specified rangeId in the request
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