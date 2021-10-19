const express = require('express');
const app = express();
const sequelize = require('./startup/db');
const { User } = require('./models/user');

require('./startup/routes')(app);

const port = process.env.PORT || 3000;
let server;

sequelize.sync().then(res => {
  // console.log(res);
  server = app.listen(port, () => console.log(`Listening on port ${port}...`));

}).catch(err => {
  console.error(err);
});


module.exports = server;