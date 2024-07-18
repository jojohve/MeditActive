import * as sql from './db.js'

const Range = function(range) {
  this.start_date = range.start_date;
  this.end_date = range.end_date;
  this.user_id = range.user_id;
};

Range.create = (newRange, result) => {
  sql.query('INSERT INTO ranges SET ?', newRange, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created range: ', { id: res.insertId, ...newRange });
    result(null, { id: res.insertId, ...newRange });
  });
};

Range.findById = (rangeId, result) => {
  sql.query('SELECT * FROM ranges WHERE id = ?', [rangeId], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found range: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Range.getAll = (filters, result) => {
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
      result(err, null);
      return;
    }

    console.log('ranges: ', res);
    result(null, res);
  });
};

Range.updateById = (id, range, result) => {
  sql.query(
    'UPDATE ranges SET start_date = ?, end_date = ?, user_id = ? WHERE id = ?',
    [range.start_date, range.end_date, range.user_id, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated range: ', { id: id, ...range });
      result(null, { id: id, ...range });
    }
  );
};

Range.remove = (id, result) => {
  sql.query('DELETE FROM ranges WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted range with id: ', id);
    result(null, res);
  });
};

module.exports = Range;