import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meditactive'
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to database:', err);
        reject(err);
      }
      console.log('Connected to MySQL database successfully!');
      resolve(connection);
    });
  });
}

export { connectToDatabase };