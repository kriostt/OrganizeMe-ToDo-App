// import the Category model
const Category = require("../models/Category");

// get list of categories
const getCategories = (req, res, next) => {
  // MongoDB query to retrieve all categories
  Category.find()
    .then((response) => {
      // send the response as JSON
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json({
        // send an error message if error occurs
        message:
          "An error occurred! Unable to retrieve the list of categories.",
      });
    });
};

// get single category based on category ID in request parameters
const getCategory = (req, res, next) => {
  // get id from request parameters
  let categoryId = req.params.id;

  // MongoDB query to retrieve category by id
  Category.findById(categoryId)
    .then((response) => {
      // send the response as JSON
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json({
        // send an error message if error occurs
        message: "An error occurred! Unable to retrieve category.",
      });
    });
};

// add new category
const addCategory = (req, res, next) => {
  // create new category with data in request body
  let category = new Category({
    name: req.body.name,
    colour: req.body.colour,
  });

  category
    // MongoDB query to save category into database
    .save()
    .then((response) => {
      res.status(200).json({
        response,
        // send a success message if category is added successfully
        message: "Category added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
        // send an error message if an error occurs
        message: "An error occurred! Unable to create new category.",
      });
    });
};

// update a category
const editCategory = (req, res, next) => {
  // get id from request parameters
  let categoryId = req.params.id;

  // set updated data with data from request body
  let updatedData = {
    name: req.body.name,
    colour: req.body.colour,
  };

  // MongoDB query to update category with specific id
  Category.findByIdAndUpdate(categoryId, { $set: updatedData })
    .then(() => {
      res.status(200).json({
        // send a success message if category is updated successfully
        message: "Category updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        // send an error message if an error occurs
        message: "An error occurred! Unable to update category.",
      });
    });
};

// delete a category
const deleteCategory = (req, res, next) => {
  // get id from request parameters
  let categoryId = req.params.id;

  // MongoDB query to delete category with specific id
  Category.findByIdAndDelete(categoryId)
    .then(() => {
      res.status(200).json({
        // send a success message if category is deleted successfully
        message: "Category deleted successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        // send an error message if an error occurs
        message: "An error occurred! Unable to delete category.",
      });
    });
};

// export the controller methods
module.exports = {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
