import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user_routes.js';
import rangeRoutes from './routes/range_routes.js';
import goalRoutes from './routes/goal_routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

userRoutes(app);
rangeRoutes(app);
goalRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});