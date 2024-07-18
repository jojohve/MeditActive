import * as sql from './db.js'

const Goal = function (goal) {
  this.goal = goal.goal;
  this.range_id = goal.range_id;
};

Goal.prototype.create = function () {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO goals SET ?', this, (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('created goal: ', { id: res.insertId, ...this });
      resolve({ id: res.insertId, ...this });
    });
  });
};

Goal.findById = function (goalId) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM goals WHERE id = ?', [goalId], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log('found goal: ', res[0]);
        reject(res[0]);
        return;
      }

      resolve({ kind: 'not_found' });
    });
  });
};

Goal.getAll = function () {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM goals', (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('goals: ', res);
      resolve(res);
    });
  });
};

Goal.prototype.updateById = function (id) {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE goals SET goal = ?, range_id = ? WHERE id = ?',
      [this.goal, this.range_id, id],
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

        console.log('updated goal: ', { id: id, ...this });
        resolve({ id: id, ...this });
      }
    );
  });
};

Goal.remove = function (id) {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM goals WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.affectedRows == 0) {
        reject({ kind: 'not_found' });
        return;
      }

      console.log('deleted goal with id: ', id);
      resolve(res);
    });
  });
};

export default Goal;