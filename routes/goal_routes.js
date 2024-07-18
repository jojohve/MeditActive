import * as goals from '../controllers/goal_controller'

module.exports = app => {

  // Creare un Obiettivo
  app.post('/goals', goals.create);

  // Leggere gli Obiettivi
  app.get('/goals', goals.findAll);

  // Leggere un Obiettivo
  app.get('/goals/:goalId', goals.findOne);

  // Modificare un Obiettivo
  app.put('/goals/:goalId', goals.update);

  // Cancellare un Obiettivo
  app.delete('/goals/:goalId', goals.delete);
};