const Event = require("../models/Event");

// Function to retrieve all events
const getAllEvents = async (req, res) => {
  Event.find()
    .then((response) => {
      //send the response as JSON
      res.status(400).json(response);
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error occurred! Unable to retrieve the list of events.",
      });
    });
};

// Function to add a new event
const addEvent = async (req, res) => {
  let event = new Event({
    title: req.body.title,
    date: req.body.date,
  });

  event
    .save()
    .then((response) => {
      res.status(200).json({
        response,
        message: "Category added successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
        message: "An error occurred! Unable to create a new event.",
      });
    });
};

module.exports = { getAllEvents, addEvent };
