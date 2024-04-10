const express = require("express");
const router = express.Router();

const CalendarController = require("../controllers/CalendarController");

// Route to retrieve all the events
router.get("/get-events", CalendarController.getAllEvents);

// Route to add a new event
router.post("/add-event", CalendarController.addEvent);

// Route to delete an event
router.delete("/delete-event/:id", CalendarController.deleteEvent);

// Route to edit an event
router.put("/edit-event/:id", CalendarController.editEvent);

module.exports = router;
