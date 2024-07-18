import * as User from '../models/user_model'

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  // Creare un Utente
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the User.'
      });
    else res.send(data);
  });
};

// Leggere gli Utenti
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving users.'
      });
    else res.send(data);
  });
};

// Leggere un Utente
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Modificare un Utente
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: 'Error updating User with id ' + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminare un Utente
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: 'Could not delete User with id ' + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};