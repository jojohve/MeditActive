const sql = require('./db.js');

// Constructor
const User = function (user) {
  this.name = user.name;
  this.surname = user.surname;
  this.email = user.email;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = result => {
  sql.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    'UPDATE users SET name = ?,surname = ?, email = ? WHERE id = ?',
    [user.name, user.surname, user.email, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

module.exports = User;
