const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('appdb', 'root', '9c%7O?PHoj0O', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;