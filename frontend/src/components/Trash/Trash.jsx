// Trash.js
import React from 'react';

const Trash = ({ events, setEvents }) => {
  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h2>Trash</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.title}
            <button onClick={() => deleteEvent(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trash;
