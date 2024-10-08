import * as users from '../controllers/user.js'

export default function (app) {

  // Creare un Utente
  app.post('/users', users.create);

  // Leggere gli Utenti
  app.get('/users', users.findAll);

  // Leggere un solo Utente
  app.get('/users/:userId', users.findOne);

  // Modificare un Utente
  app.put('/users/:userId', users.update);

  // Cancellare un Utente
  app.delete('/users/:userId', users.remove);
};