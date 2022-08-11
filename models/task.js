const Sequelize = require("sequelize");
const sequelize = require("../startup/db");
const Joi = require("joi");

const Task = sequelize.define("task", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.BIGINT.UNSIGNED,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  userId: {
    allowNull: false,
    type: Sequelize.BIGINT.UNSIGNED,
  },
});

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string()
      .min(2)
      .max(255)
      .required()
      .regex(/^[\w][\w\s]*$/),
    body: Joi.string().min(5).max(255).required(),
    author: Joi.string().min(3).max(255).required(),
    status: Joi.number().min(0).max(3).required(),
  });

  return schema.validate(task);
}

module.exports.Task = Task;
module.exports.validate = validateTask;
