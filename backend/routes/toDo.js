// import Express.js framework
const express = require("express");
// create router instance for defining routes
const router = express.Router();

// import ToDoController for handling todo-related operations
const ToDoController = require("../controllers/ToDoController"); // Importing ToDoController
const UserController = require("../controllers/UserController"); // Importing UserController

// define routes and associate them with controller methods

// handle GET requests for retrieving to do list
router.get("/home", ToDoController.index);
// handle POST requests for adding a new to do list item
router.post("/add", ToDoController.add);
// Defining routes for user signup and login
router.post("/signup", UserController.signup); // Route for user signup
router.post("/login", UserController.login); // Route for user login

module.exports = router; // Exporting the router for use in other files
