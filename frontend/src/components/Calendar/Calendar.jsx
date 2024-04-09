import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios"; // Import axios for HTTP requests

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    data: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleAdd();
  };

  // add new event
  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3001/add-event", event);

      if (res.status === 200) {
        setEvent(res.data);
        // if successful, reset the form and display success message
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update the event state and format it properly
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get-events");

      if (res.status === 200) {
        // Format events to match FullCalendar's expectations
        const formattedEvents = res.data.map((event) => ({
          title: event.title,
          start: event.date, // Assuming your event object has a 'date' property
        }));

        setEvents(formattedEvents); // Update events state
      }
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  return (
    <div className="calendar-container">
      <h2>OrganizeMe Calendar</h2>
      <form onSubmit={handleFormSubmit} className="calendar-form-container">
        <input
          type="text"
          name="title"
          value={event.title}
          onChange={handleChange} // Changed from handleFormChange to handleChange
          placeholder="Enter title"
          className="calendar-form-input"
        />
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange} // Changed from handleFormChange to handleChange
          className="calendar-form-input"
        />
        <button type="submit" className="calendar-form-button">
          Add Note
        </button>
      </form>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        height="450px"
      />
    </div>
  );
};

export default Calendar;
