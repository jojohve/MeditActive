import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as userRoutes from './routes/user_routes';
import * as rangeRoutes from './routes/range_routes';
import * as goalRoutes from './routes/goal_routes';

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