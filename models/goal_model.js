const sql = require('./db.js');

const Goal = function(goal) {
  this.goal = goal.goal;
  this.range_id = goal.range_id;
};

Goal.create = (newGoal, result) => {
  sql.query('INSERT INTO goals SET ?', newGoal, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created goal: ', { id: res.insertId, ...newGoal });
    result(null, { id: res.insertId, ...newGoal });
  });
};

Goal.findById = (goalId, result) => {
  sql.query('SELECT * FROM goals WHERE id = ?', [goalId], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found goal: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Goal.getAll = result => {
  sql.query('SELECT * FROM goals', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('goals: ', res);
    result(null, res);
  });
};

Goal.updateById = (id, goal, result) => {
  sql.query(
    'UPDATE goals SET goal = ?, range_id = ? WHERE id = ?',
    [goal.goal, goal.range_id, id],
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

      console.log('updated goal: ', { id: id, ...goal });
      result(null, { id: id, ...goal });
    }
  );
};

Goal.remove = (id, result) => {
  sql.query('DELETE FROM goals WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted goal with id: ', id);
    result(null, res);
  });
};

module.exports = Goal;