const router = require("express").Router();
const auth = require("../middlewares/auth");
const taskController = require("./../controllers/task.controller");

// Get All User Tasks
router.get("/", auth, taskController.getAllUsers);

// Create a new Task
router.post("/", auth, taskController.createTask);

// Patch a task
router.patch("/:id", auth, taskController.patchTask);

module.exports = router;
