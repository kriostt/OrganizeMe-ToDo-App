// import Express.js framework
const express = require("express");
// create router instance for defining routes
const router = express.Router();

// import ToDoController for handling todo-related operations
const ToDoController = require("../controllers/ToDoController"); // Importing ToDoController

// define routes and associate them with controller methods

// handle GET requests for retrieving to do list
router.get("/", ToDoController.index);
// handle GET requests for retrieving a to do list item
router.get("/get-todo/:id", ToDoController.getToDoById);
// handle POST requests for adding a new to do list item
router.post("/add", ToDoController.add);
// handle DELETE requests for deleting a to do list item
router.delete("/remove/:id", ToDoController.remove);

// handle PUT requests for moving a task to the bin
router.put("/bin/:id", ToDoController.moveToBin);
// handle PUT requests for removing a task from the bin
router.put("/bin/remove/:id", ToDoController.removeFromBin);
// handle GET requests for getting a task from the bin
router.get("/bin", ToDoController.getTasksInBin);

// handle PUT requests for moving a task to favorites
router.put("/favorites/:id", ToDoController.addToFavorites);
// handle PUT requests for removing a task from favorites
router.put("/favorites/remove/:id", ToDoController.removeFromFavorites);
// handle GET requests for getting a task from favorites
router.get("/favorites", ToDoController.getFavorites);

module.exports = router; // Exporting the router for use in other files
