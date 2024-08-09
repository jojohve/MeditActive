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

Range.getAll = async (filters, offset, limit) => {
  let query = 'SELECT * FROM Ranges WHERE 1=1';
  let queryParams = [];

  if (filters.goal) {
    query += ' AND goal = ?';
    queryParams.push(filters.goal);
  }

  if (filters.start_date) {
    query += ' AND start_date >= ?';
    queryParams.push(filters.start_date);
  }

  if (filters.end_date) {
    query += ' AND end_date <= ?';
    queryParams.push(filters.end_date);
  }

  query += ' LIMIT ?, ?';
  queryParams.push(offset, limit);

  const [data] = await db.execute(query, queryParams);

  const [countResult] = await db.execute('SELECT COUNT(*) as count FROM Ranges WHERE 1=1', queryParams.slice(0, -2));
  const totalItems = countResult[0].count;

  return { data, totalItems };
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