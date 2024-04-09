const Event = require("../models/Event");

// Function to retrieve all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({
      message: "An error occurred! Unable to retrieve the list of events.",
      error: error.message
    });
  }
};

// Function to add a new event
const addEvent = async (req, res) => {
  try {
    const { title, date } = req.body;
    const event = new Event({ title, date });
    const savedEvent = await event.save();
    res.status(200).json({
      event: savedEvent,
      message: "Event added successfully!"
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred! Unable to create a new event.",
      error: error.message
    });
  }
};

// Function to delete an event
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await Event.findByIdAndDelete(eventId);
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred! Unable to delete the event.",
      error: error.message
    });
  }
};

// Function to edit an event
const editEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, date } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, date },
      { new: true }
    );
    res.status(200).json({
      event: updatedEvent,
      message: "Event updated successfully!"
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred! Unable to update the event.",
      error: error.message
    });
  }
};

module.exports = { getAllEvents, addEvent, deleteEvent, editEvent };