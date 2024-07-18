import * as sql from './db.js'

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
};

User.prototype.create = function () {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO users SET ?', this, (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('created user: ', { id: res.insertId, ...this });
      resolve({ id: res.insertId, ...this });
    });
  });
};

User.findById = function (userId) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM users WHERE id = ?', [userId], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log('found user: ', res[0]);
        resolve(res[0]);
        return;
      }

      reject({ kind: 'not_found' });
    });
  });
};

User.getAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM users', (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('users: ', res);
      resolve(res);
    });
  });
};

User.prototype.updateById = function (id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [this.name, this.email, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          reject(err);
          return;
        }

        if (res.affectedRows == 0) {
          reject({ kind: 'not_found' });
          return;
        }

        console.log('updated user: ', { id: id, ...this });
        resolve({ id: id, ...this });
      }
    );
  });
};

User.remove = function (id) {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM users WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.affectedRows == 0) {
        reject({ kind: 'not_found' });
        return;
      }

      console.log('deleted user with id: ', id);
      resolve(res);
    });
  });
};

export default User;