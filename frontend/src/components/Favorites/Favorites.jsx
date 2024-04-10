import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Favorites.css";

const Favorites = () => {
  // State to store favorite tasks
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  // Function to fetch favorite tasks from the server
  const fetchFavoriteTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3001/favorites");

      if (res.status === 200) {
        setFavoriteTasks(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFavoriteTasks();
  }, []);

  // Function to remove a favorite task
  const removeFavorite = async (taskId) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/favorites/remove/${taskId}`
      );
      if (res.status === 200) {
        fetchFavoriteTasks(); // Refresh favorite tasks after removal
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleString(undefined, options);
    return formattedDate;
  };

  return (
    <div>
      <h2>Favorite Tasks</h2>
      {favoriteTasks && favoriteTasks.length > 0 ? (
        <table className="custom-table">
          <thead className="custom-thead">
            <tr>
              <th className="custom-column-header custom-col-2" scope="col">
                Category
              </th>
              <th className="custom-column-header custom-col-2" scope="col">
                Title
              </th>
              <th className="custom-column-header custom-col-2" scope="col">
                Description
              </th>
              <th className="custom-column-header custom-col-2" scope="col">
                Due Date
              </th>
              <th className="custom-column-header custom-col-2" scope="col">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {favoriteTasks.map((task) => (
              <tr key={task._id}>
                <td
                  className={`text-center custom-category-${
                    task.category && task.category.colour
                      ? task.category.colour
                      : "default"
                  }`}
                >
                  {task.category && task.category.name
                    ? task.category.name
                    : ""}
                </td>
                <td className="text-center">{task.title}</td>
                <td className="text-center">{task.description}</td>
                <td className="text-center">{formatDate(task.dueDate)}</td>
                <td className="text-center">
                  <button
                    className="favorite-button"
                    onClick={() => removeFavorite(task._id)}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No favorite tasks</p>
      )}
    </div>
  );
};

export default Favorites;
