const express = require("express");
const router = express.Router();

const CalendarController = require("../controllers/CalendarController");

// Route to retrieve all the events
router.get("/get-events", getAllEvents);

// Route to add a new event
router.post("/add-event", addEvent);

module.exports = router;
