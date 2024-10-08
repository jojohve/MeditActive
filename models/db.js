import * as mysql from 'mysql'
import * as dbConfig from '../config/db_config.js'

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(error => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

export default connection;