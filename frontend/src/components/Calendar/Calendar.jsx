import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css"; // Import CSS file for additional styling

const Calendar = () => {
  // States to manage events and new event inputs
  const [events, setEvents] = useState([]); // Array to store events
  const [newEvent, setNewEvent] = useState({
    // Object to manage new event inputs
    title: "",
    date: "",
  });

  // Fetches events from server when component mounts
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array ensures the effect runs only once

  // Updates state with new input values as they change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handles form submission to add a new event
  const handleFormSubmit = (e) => {
    e.preventDefault();
    addEvent();
  };

  // Sends POST request to add a new event
  const addEvent = async () => {
    try {
      const res = await axios.post("http://localhost:3001/add-event", newEvent);
      if (res.status === 200) {
        setNewEvent({ title: "", date: "" }); // Reset new event inputs
        fetchEvents(); // Fetch events after adding a new one
        alert(res.data.message); // Alert success message
      }
    } catch (error) {
      console.log("Error adding event:", error);
      alert("An error occurred while adding the event.");
    }
  };

  // Fetches events from server
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get-events");
      if (res.status === 200) {
        // Formats events data and update state
        const formattedEvents = res.data.map((event) => ({
          id: event._id,
          title: event.title,
          date: event.date,
        }));
        setEvents(formattedEvents);
      }
    } catch (error) {
      console.log("Error fetching events:", error);
      alert("An error occurred while fetching events.");
    }
  };

  // Handles editing an event
  const handleEditEvent = async (eventId) => {
    const editedEvent = events.find((event) => event.id === eventId); // Find the event to edit
    const newTitle = prompt("Enter new title:", editedEvent.title); // Prompt user for new title
    const newDate = prompt("Enter new date (YYYY-MM-DD):", editedEvent.date); // Prompt user for new date

    if (!newTitle || !newDate) {
      alert("Title and date cannot be empty."); // Ensure title and date are provided
      return;
    }

    // Updates events array with edited event
    const updatedEvents = events.map((event) =>
      event.id === eventId
        ? { ...event, title: newTitle, date: newDate }
        : event
    );
    setEvents(updatedEvents); // Update state with edited events

    try {
      // Sends PUT request to update event on the server
      await axios.put(`http://localhost:3001/edit-event/${eventId}`, {
        title: newTitle,
        date: newDate,
      });
      alert("Event updated successfully!"); // Alert success message
    } catch (error) {
      console.log("Error editing event:", error);
    }
  };

  // Handles event deletion
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      // Filter out the deleted event from events array
      const updatedEvents = events.filter((event) => event.id !== eventId);
      setEvents(updatedEvents); // Update state with updated events
      try {
        // Sends DELETE request to delete event from server
        await axios.delete(`http://localhost:3001/delete-event/${eventId}`);
        alert("Event deleted successfully!"); // Alerts success message
      } catch (error) {
        console.log("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="calendar-container">
      <h2>OrganizeMe Calendar</h2>
      <form onSubmit={handleFormSubmit} className="calendar-form-container">
        <input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleChange}
          placeholder="Enter title"
          className="calendar-form-input"
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="calendar-form-input"
        />
        <button type="submit" className="calendar-form-button">
          Add Event
        </button>
      </form>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventContent={(eventInfo) => (
          <div>
            <p>{eventInfo.event.title}</p>
            <button
              className="calendar-button-sm"
              onClick={() => handleDeleteEvent(eventInfo.event.id)}
            >
              Delete
            </button>
            <button
              className="calendar-button-sm"
              onClick={() => handleEditEvent(eventInfo.event.id)}
            >
              Edit
            </button>
          </div>
        )}
        height="450px"
      />
    </div>
  );
};

export default Calendar;
