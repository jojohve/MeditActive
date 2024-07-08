const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

require('./routes/user.routes')(app);

require('./routes/range.routes')(app);

require('./routes/goal.routes')(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});