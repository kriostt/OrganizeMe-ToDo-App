import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
  const [events, setEvents] = useState([
    // Sample events data (replacing it with backend later)
    { title: 'Event 1', date: '2024-03-25' },
    { title: 'Event 2', date: '2024-03-27' },
    { title: 'Event 3', date: '2024-03-30' },
  ]);
  const [formData, setFormData] = useState({ title: '', date: '' });

  const handleFormChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    // Creates a new event object from the form data
    const newEvent = { title: formData.title, date: formData.date };
    // Updates the events array with the new event
    setEvents([...events, newEvent]);
    // Clears the form data
    setFormData({ title: '', date: '' });
  };

  return (
    <div>
      <h2>OrganizeMe Calendar</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          placeholder="Enter title"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleFormChange}
        />
        <button type="submit">Add Note</button>
      </form>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
      />
    </div>
  );
};

export default Calendar;
