module.exports = app => {
  const ranges = require('../controllers/range_controller');

  // Creare un Intervallo
  app.post('/ranges', ranges.create);

  // Leggere gli Intervalli
  app.get('/ranges', ranges.findAll);

  // Leggere un Intervallo
  app.get('/ranges/:rangeId', ranges.findOne);

  // Modificare un Intervallo
  app.put('/ranges/:rangeId', ranges.update);

  // Cancellare un Intervallo
  app.delete('/ranges/:rangeId', ranges.delete);
};