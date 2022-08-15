const router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const userController = require("./../controllers/user.controller");

//Get current user
router.get("/me", auth, userController.getMyUserData);

//Get All Users
router.get("/", [auth, admin], userController.getAllUsers);

// Create a new User
router.post("/", userController.createUser);

module.exports = router;
