// import Express.js framework
const express = require("express");
// create router instance for defining routes
const router = express.Router();

// import CategoryController for handling category-related operations
const CategoryController = require("../controllers/CategoryController");

// define routes and associate them with controller methods

// handle GET requests for retrieving list of categories
router.get("/get-categories", CategoryController.getCategories);

// handle GET requests for retrieving a single category
router.get("/get-category/:id", CategoryController.getCategory)

// handle POST requests for adding a new category
router.post("/add-category", CategoryController.addCategory);

// handle PUT requests for editing a category
router.put("/edit-category/:id", CategoryController.editCategory);

// handle DELETE requests for deleting a category
router.delete("/delete-category/:id", CategoryController.deleteCategory);

// export the router to be used in main application
module.exports = router;
