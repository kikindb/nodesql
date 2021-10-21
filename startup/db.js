const { Sequelize } = require('sequelize');

console.log('HOST: ', process.env.MYSQL_HOST);

const sequelize = new Sequelize(process.env.DB_NAME, "root", process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  retry: {
    match: [
      Sequelize.ConnectionError,
      Sequelize.ConnectionTimedOutError,
      Sequelize.TimeoutError,
      /Deadlock/i,
      'SQLITE_BUSY'],
    max: 3
  }
});

module.exports = sequelize;