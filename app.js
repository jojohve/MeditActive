const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

require('./routes/user_routes')(app);

require('./routes/range_routes')(app);

require('./routes/goal_routes')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});