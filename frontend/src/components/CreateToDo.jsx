// import necessary modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// component for adding new to do list items
const CreateToDo = () => {
  // hook to navigate between pages
  const navigate = useNavigate();

  // state variables for categories, validation error, and to do list item
  const [categories, setCategories] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [toDo, setToDo] = useState({
    title: "",
    description: "",
    category: null,
    dueDate: "",
  });

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

  // run readCategories on component mount
  useEffect(() => {
    readCategories();
  }, []);

  // event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // check if user wants to add a new category
    if (value === "newCategory") {
      // navigate to add category page
      navigate("/add-category");
    } else {
      // update toDo state with new input value
      setToDo({ ...toDo, [name]: value });
    }
  };

  // event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if form is valid
    if (!toDo.title.trim()) {
      // set titleError state with error message
      setTitleError("Please enter the title for the task.");
    } else {
      // proceed to add toDo
      handleAdd();
    }
  };

  // add new to do list item
  const handleAdd = async () => {
    try {
      const res = await axios.post("http://localhost:3001/add", toDo);

      if (res.status === 200) {
        // if successful, reset the form and dispaly success message
        resetForm();
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // reset the form
  const resetForm = () => {
    setToDo({
      title: "",
      description: "",
      category: "",
      dueDate: "",
    });
  };

  // JSX for the form and page elements
  return (
    <div>
      <h2>Add Task</h2>

      {/* display validation errors if there's any */}
      <p className="text-danger">{titleError}</p>

      {/* to do list item form */}
      <form onSubmit={handleSubmit}>
        {/* dropdown for category */}
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={toDo.category}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}

            {/* render option for adding a new category */}
            <option value="newCategory">Add a new category</option>
          </select>
        </div>

        {/* label and input for title */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={toDo.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* label and input for description */}
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={toDo.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* label and input for due date */}
        <div className="form-group">
          <label>Due date:</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={toDo.dueDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* buttons for adding a to do list item or cancelling addition */}
        <button type="submit" className="btn btn-success btn-lg mr-3">
          Add
        </button>

        <button
          onClick={() => navigate("/")}
          className="btn btn-danger btn-lg mr-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

// export CreateToDo component
export default CreateToDo;
