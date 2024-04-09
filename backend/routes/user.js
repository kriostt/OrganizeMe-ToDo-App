// import Express.js framework
const express = require("express");
// create router instance for defining routes
const router = express.Router();

const UserController = require("../controllers/UserController"); // Importing UserController

// Defining routes for user signup and login
router.post("/signup", UserController.signup); // Route for user signup
router.post("/login", UserController.login); // Route for user login

module.exports = router; // Exporting the router for use in other files
