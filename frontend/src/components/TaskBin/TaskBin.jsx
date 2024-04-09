import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskBin = () => {
  const [tasksInBin, setTasksInBin] = useState([]);

  const fetchTasksInBin = async () => {
    try {
      const res = await axios.get("http://localhost:3001/bin");

      if (res.status === 200) {
        setTasksInBin(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasksInBin();
  }, []);

  const restoreFromBin = async (taskId) => {
    try {
      const res = await axios.put(`http://localhost:3001/bin/remove/${taskId}`);
      if (res.status === 200) {
        fetchTasksInBin(); // Refresh tasks in the bin after restoration
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
      <h2>Task Bin</h2>
      {tasksInBin && tasksInBin.length > 0 ? (
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasksInBin.map((task) => (
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
                    onClick={() => restoreFromBin(task._id)}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "10px 10px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "15px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Restore
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tasks in the bin</p>
      )}
    </div>
  );
};

export default TaskBin;
