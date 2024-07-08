module.exports = app => {
    const goals = require('../controllers/goal.controller');
  
    // Create a new Goal
    app.post('/goals', goals.create);
  
    // Retrieve all Goals
    app.get('/goals', goals.findAll);
  
    // Retrieve a single Goal with goalId
    app.get('/goals/:goalId', goals.findOne);
  
    // Update a Goal with goalId
    app.put('/goals/:goalId', goals.update);
  
    // Delete a Goal with goalId
    app.delete('/goals/:goalId', goals.delete);
  };
  