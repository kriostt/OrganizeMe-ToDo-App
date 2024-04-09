// import necessary modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// component for getting to do list
const ReadToDoList = () => {
  // state variables
  const [categories, setCategories] = useState([]);
  const [toDoList, setToDoList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortByDueDateAsc, setSortByDueDateAsc] = useState(true);
  const [filteredToDoList, setFilteredToDoList] = useState([]);

  // get and set categories from server
  const readCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/get-categories");

      if (res.status === 200) {
        // set categories in state
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    readCategories();
  }, []);

  // run applySearchAndFilters on state variable changes
  useEffect(() => {
    applySearchAndFilters();
  }, [toDoList, categoryFilter, searchText, sortByDueDateAsc]);

  // apply search and filters
  const applySearchAndFilters = () => {
    let filteredList = toDoList.filter((item) => {
      const { title, description } = item;
      return (
        title.toLowerCase().includes(searchText.toLowerCase()) ||
        description.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    filteredList = filteredList.filter((item) => {
      if (categoryFilter !== "All" && item.category) {
        return item.category.name === categoryFilter;
      }
      return true;
    });

    filteredList.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortByDueDateAsc ? dateA - dateB : dateB - dateA;
    });

    setFilteredToDoList(filteredList);
  };

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

  const clearFilters = () => {
    setSearchText("");
    setCategoryFilter("All");
    setSortByDueDateAsc(true);
  };

  const moveToBin = async (taskId) => {
    try {
      const res = await axios.put(`http://localhost:3001/bin/${taskId}`);
      if (res.status === 200) {
        // Update the state to reflect changes
        readToDoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromBin = async (taskId) => {
    try {
      const res = await axios.put(`http://localhost:3001/bin/remove/${taskId}`);
      if (res.status === 200) {
        // Update the state to reflect changes
        readToDoList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // JSX for the component
  return (
    <div className="container">
      {/* search bar */}
      <input
        type="text"
        placeholder="Search by Title or Description"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="form-control mb-3"
      />

      <div className="row">
        <div className="col">
          {/* category filter */}
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-select mb-3"
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col">
          {/* due date sort by button */}
          <button
            id="sortByDueDate"
            onClick={() => setSortByDueDateAsc(!sortByDueDateAsc)}
            className="btn btn-primary mb-3"
          >
            {sortByDueDateAsc ? "Ascending" : "Descending"}
          </button>
        </div>

        <div className="col">
          {/* button to clear all filters */}
          <button onClick={clearFilters} className="btn btn-secondary mb-3">
            Clear Filters
          </button>
        </div>
      </div>

      {/* horizontal line */}
      <hr />

      <h2>To Do List</h2>

      {/* link to navigate to Add To Do page */}
      <div className="add-button">
        <Link to="/add" className="btn btn-primary">
          Add Task
        </Link>
      </div>

      {/* check if to do list exists */}
      {filteredToDoList && filteredToDoList.length > 0 ? (
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
              <th className="custom-column-header custom-col-2" scope="col">
                Actions
              </th>
            </tr>
          </thead>

          {/* table rows */}
          <tbody>
            {/* map through to do list and display each item in table row */}
            {filteredToDoList.map((toDo) => (
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
                <td className="text-center">
                  {/* Button to move task to bin */}
                  <button
                    onClick={() => moveToBin(toDo._id)}
                    style={{
                      backgroundColor: "#f44336",
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
                    Move to Bin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // display messsage if there's no to do list
        <p className="no-tasks-message">All caught up!</p>
      )}
    </div>
  );
};

// export ReadToDoList component
export default ReadToDoList;
