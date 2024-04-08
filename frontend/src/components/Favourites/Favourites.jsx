// Favourites.js
import React, { useState } from 'react';

const Favourites = ({ events, setEvents }) => {
  const toggleFavourite = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].favourite = !updatedEvents[index].favourite;
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h2>Favourites</h2>
      <ul>
        {events.map((event, index) => (
          event.favourite && (
            <li key={index}>
              {event.title}
              <button onClick={() => toggleFavourite(index)}>
                {event.favourite ? 'Unfavourite' : 'Favourite'}
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
