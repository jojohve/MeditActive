module.exports = app => {
    const ranges = require('../controllers/range.controller');
  
    // Create a new Range
    app.post('/ranges', ranges.create);
  
    // Retrieve all Ranges
    app.get('/ranges', ranges.findAll);
  
    // Retrieve a single Range with rangeId
    app.get('/ranges/:rangeId', ranges.findOne);
  
    // Update a Range with rangeId
    app.put('/ranges/:rangeId', ranges.update);
  
    // Delete a Range with rangeId
    app.delete('/ranges/:rangeId', ranges.delete);
  };  