import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meditactive'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore durante la connessione al database:', err);
    throw err;
  }
  console.log('Connessione al database MySQL riuscita!');
});

export default connection;