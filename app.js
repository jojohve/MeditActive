import express from 'express';
import bodyParser from 'body-parser';
import { connectToDatabase } from './config/db_config.js';
import userRoutes from './routes/user_routes.js';
import rangeRoutes from './routes/range_routes.js';
import goalRoutes from './routes/goal_routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase()
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to our application.' });
    });

    userRoutes(app);
    rangeRoutes(app);
    goalRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during server startup:', err);
  });