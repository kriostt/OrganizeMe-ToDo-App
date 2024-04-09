const express = require("express");
const router = express.Router();

const CalendarController = require("../controllers/CalendarController");

// Route to retrieve all the events
router.get("/get-events", CalendarController.getAllEvents);

// Route to add a new event
router.post("/add-event", CalendarController.addEvent);

router.delete("/delete-event", CalendarController.deleteEvent);

router.put("/edit-event", CalendarController.editEvent);

module.exports = router;
