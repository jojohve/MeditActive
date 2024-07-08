const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our application.' });
});

// Include user routes
require('./routes/user.routes')(app);

// Include range routes
require('./routes/range.routes')(app);

// Set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});