import * as User from '../models/user.js'

export const create = async (req, res) => {
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

  try {
    const data = await user.create();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    });
  }
};

// Leggere gli Utenti
export const findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      offset: offset,
      limit: limit
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      data: rows,
      currentPage: page,
      totalPages: totalPages,
      totalItems: count
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'An error occurred while retrieving Users.'
    });
  }
};

// Leggere un Utente
export const findOne = async (req, res) => {
  try {
    const data = await User.findById(req.params.userId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found User with id ${req.params.userId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error retrieving User with id ' + req.params.userId
      });
    }
  }
};

// Modificare un Utente
export const update = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }

  const user = new User(req.body);

  try {
    const data = await user.updateById(req.params.userId);
    res.send(data);
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found User with id ${req.params.userId}.`
      });
    } else {
      res.status(500).send({
        message: 'Error updating User with id ' + req.params.userId
      });
    }
  }
};

// Eliminare un Utente
export const remove = async (req, res) => {
  try {
    await User.remove(req.params.userId);
    res.send({ message: `User was deleted successfully!` });
  } catch (err) {
    if (err.kind === 'not_found') {
      res.status(404).send({
        message: `Not found User with id ${req.params.userId}.`
      });
    } else {
      res.status(500).send({
        message: 'Could not delete User with id ' + req.params.userId
      });
    }
  }
};