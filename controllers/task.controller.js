const _ = require("lodash");
const { Task, validate } = require("./../models/task");

async function getAllUsers(req, res) {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  return res.send(tasks);
}

async function createTask(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task(
    _.pick(req.body, ["title", "body", "author", "status", "userId"])
  );

  let taskRes = await Task.create({
    title: task.dataValues.title,
    body: task.dataValues.body,
    author: task.dataValues.author,
    status: task.dataValues.status,
    userId: req.user.id,
  });

  return res
    .status(201)
    .send(_.pick(taskRes, ["id", "title", "body", "author", "status"]));
}

async function patchTask(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  console.log(req.params.id);

  let task = await Task.findOne({ where: { id: req.params.id } });
  if (!task) return res.status(400).send("No task found.");

  if (task.userId !== req.user.id)
    return res.status(401).send("User not authorized");

  await task.update(req.body);

  return res
    .status(200)
    .send({ message: "patching... " + req.params.id, task: task });
}

module.exports = {
  getAllUsers,
  createTask,
  patchTask,
};
