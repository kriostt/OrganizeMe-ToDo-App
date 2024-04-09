// import the ToDo model
const ToDo = require("../models/ToDo");

// show list of to do list items
const index = (req, res, next) => {
  // MongoDB query to retrieve all to do list items
  ToDo.find({ bin: false })
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
    bin: false,
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

const moveToBin = (req, res, next) => {
  const taskId = req.params.id;

  // Find the task by ID and update its bin status
  ToDo.findByIdAndUpdate(taskId, { bin: true })
    .then(() => {
      res.status(200).json({ message: "Task moved to bin successfully" });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred while moving task to bin",
        error: error,
      });
    });
};

const removeFromBin = (req, res, next) => {
  const taskId = req.params.id;

  // Find the task by ID and update its bin status
  ToDo.findByIdAndUpdate(taskId, { bin: false })
    .then(() => {
      res.status(200).json({ message: "Task removed from bin successfully" });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred while removing task from bin",
        error: error,
      });
    });
};

const getTasksInBin = (req, res, next) => {
  ToDo.find({ bin: true })
    .populate("category", ["name", "colour"])
    .exec()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred! Unable to retrieve tasks from the bin.",
        error: error,
      });
    });
};

// export the controller methods
module.exports = { index, add, moveToBin, removeFromBin, getTasksInBin };
