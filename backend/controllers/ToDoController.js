// import the ToDo model
const ToDo = require("../models/ToDo");

// show list of to do list items
const index = (req, res, next) => {
  // MongoDB query to retrieve all to do list items
  ToDo.find()
    // populate both name and colour fields of category
    .populate("category", ["name", "colour"])
    .exec()
    .then((response) => {
      // send the response as JSON
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json({
        // send an error message if error occurs
        message: "An error occurred! Unable to retrieve the to do list.",
      });
    });
};

// add new to do list item
const add = (req, res, next) => {
  // create new to do list item with data in request body
  let toDo = new ToDo({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  });

  toDo
    // MongoDB query to save to do list item into database
    .save()
    .then((response) => {
      res.status(200).json({
        response,
        // send a success message if to do list item is added successfully
        message: "Added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
        // send an error message if an error occurs
        message: "An error occurred! Unable to create new to do list item.",
      });
    });
};

// export the controller methods
module.exports = { index, add };
