// import necessary modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// component for getting to do list
const ReadToDoList = () => {
  // state to store to do list
  const [toDoList, setToDoList] = useState([]);

  // get and set to do list from server
  const readToDoList = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");

      if (res.status === 200) {
        // set toDoList in state
        setToDoList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // run readToDoList on component mount
  useEffect(() => {
    readToDoList();
  }, []);

  // function to format date to MM/DD/YYYY HH:MM
  const formatDate = (dateString) => {
    // if no date input, return empty string
    if (!dateString) {
      return "";
    }

    // create new Date object from date string
    const date = new Date(dateString);

    // define options for formatting the date
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    // format the date using toLocaleString with the defined options
    const formattedDate = date.toLocaleString(undefined, options);

    // return the formatted date
    return formattedDate;
  };

  // JSX for the component
  return (
    <div>
      {/* link to navigate to Add To Do page */}
      <Link to="/add" className="btn btn-primary-task">
        Add Task
      </Link>

      {/* check if to do list exists */}
      {toDoList && toDoList.length > 0 ? (
        // display table with to do list
        <table className="custom-table">
          {/* table column titles */}
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
            </tr>
          </thead>

          {/* table rows */}
          <tbody>
            {/* map through to do list and display each item in table row */}
            {toDoList.map((toDo) => (
              <tr key={toDo._id}>
                <td
                  className={`text-center custom-category-${
                    toDo.category && toDo.category.colour
                      ? toDo.category.colour
                      : "default"
                  }`}
                >
                  {/* Check if toDo.category exists before accessing its properties */}
                  {toDo.category && toDo.category.name
                    ? toDo.category.name
                    : ""}
                </td>
                <td className="text-center">{toDo.title}</td>
                <td className="text-center">{toDo.description}</td>
                <td className="text-center">{formatDate(toDo.dueDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // display messsage if there's no to do list
        <p>All caught up!</p>
      )}
    </div>
  );
};

// export ReadToDoList component
export default ReadToDoList;
