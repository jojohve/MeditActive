import * as sql from './db.js'

const Range = function (range) {
  this.start_date = range.start_date;
  this.end_date = range.end_date;
  this.user_id = range.user_id;
};

Range.prototype.create = function () {
  return new Promise((resolve, reject) => {
    sql.query('INSERT INTO ranges SET ?', this, (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('created range: ', { id: res.insertId, ...this });
      resolve({ id: res.insertId, ...this });
    });
  });
};

Range.findById = function (rangeId) {
  return new Promise((resolve, reject) => {
    sql.query('SELECT * FROM ranges WHERE id = ?', [rangeId], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.length) {
        console.log('found range: ', res[0]);
        resolve(res[0]);
        return;
      }

      reject({ kind: 'not_found' });
    });
  });
};

Range.getAll = function (filters) {
  return new Promise((resolve, reject) => {
    let query = `
    SELECT r.*, g.goal
    FROM ranges r
    LEFT JOIN goals g ON r.id = g.range_id
  `;
    let conditions = [];
    let values = [];

    if (filters.goal) {
      conditions.push('g.goal LIKE ?');
      values.push(`%${filters.goal}%`);
    }

    if (filters.start_date) {
      conditions.push('r.start_date >= ?');
      values.push(filters.start_date);
    }

    if (filters.end_date) {
      conditions.push('r.end_date <= ?');
      values.push(filters.end_date);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    sql.query(query, values, (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      console.log('ranges: ', res);
      resolve(res);
    });
  });
};

Range.prototype.updateById = (id) => {
  return new Promise((resolve, reject) => {
    sql.query(
      'UPDATE ranges SET start_date = ?, end_date = ?, user_id = ? WHERE id = ?',
      [this.start_date, this.end_date, this.user_id, id],
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

        console.log('updated range: ', { id: id, ...this });
        resolve({ id: id, ...this });
      }
    );
  });
};

Range.remove = function (id) {
  return new Promise((resolve, reject) => {
    sql.query('DELETE FROM ranges WHERE id = ?', [id], (err, res) => {
      if (err) {
        console.log('error: ', err);
        reject(err);
        return;
      }

      if (res.affectedRows == 0) {
        reject({ kind: 'not_found' });
        return;
      }

      console.log('deleted range with id: ', id);
      resolve(res);
    });
  });
};

export default Range;