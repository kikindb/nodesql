const { Sequelize } = require("sequelize");

console.log("HOST: ", process.env.DB_HOST);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    retry: {
      match: [
        Sequelize.ConnectionError,
        Sequelize.ConnectionTimedOutError,
        Sequelize.TimeoutError,
        /Deadlock/i,
        "SQLITE_BUSY",
      ],
      max: 3,
    },
  }
);

module.exports = sequelize;
