// import necessary modules
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// component for adding new category
const CreateCategory = () => {
  // hook to navigate between pages
  const navigate = useNavigate();

  // state variables for categories, validation errors, and category inputs
  const [categories, setCategories] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [category, setCategory] = useState({
    name: "",
    colour: "",
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

  // run readCategories on component mount and when categories change
  useEffect(() => {
    readCategories();
  }, [categories]);

  // event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // update category state with new input value
    setCategory({ ...category, [name]: value });
  };

  // event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if form is valid, then proceed to add category
    if (validateForm()) {
      handleAdd();
    }
  };

  // add new category
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/add-category",
        category
      );

      if (res.status === 200) {
        // if successful, reset the form and display success message
        resetForm();
        alert(res.data.message);
        navigate("/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // reset the form
  const resetForm = () => {
    setCategory({
      name: "",
      colour: "",
    });
  };

  // validate the form inputs to ensure they are provided
  const validateForm = () => {
    const errors = {};

    // set error message if category name is empty
    if (!category.name.trim()) {
      errors.name = "Please enter the category name.";
    }
    // set error message if category colour is empty
    if (!category.colour.trim()) {
      errors.colour = "Please enter the category colour.";
    }

    // set validation errors
    setValidationErrors(errors);

    // return true if there are no validation errors
    return Object.keys(errors).length === 0;
  };

  // function to format colour string
  const formatColourString = (colour) => {
    // define colour names to more commonly used names for same hues
    const colours = {
      lightcoral: "Red",
      lightsalmon: "Orange",
      palegoldenrod: "Yellow",
      lightgreen: "Green",
      lightblue: "Blue",
      plum: "Purple",
      lightpink: "Pink",
      lightgray: "Gray",
      tan: "Brown",
    };

    // return formatted colour name
    return colours[colour];
  };

  // JSX for the form and page elements
  return (
    <div className="category-form">
      <h2>Add Category</h2>

      {/* display validation errors if there's any */}
      <ul className="text-danger">
        {Object.values(validationErrors).map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>

      {/* category form */}
      <form onSubmit={handleSubmit}>
        {/* label and input for name */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* dropdown for colour */}
        <div className="form-group">
          <label>Colour:</label>
          <select
            name="colour"
            value={category.colour}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a colour</option>
            {/* options for selecting category colour */}
            <option value="lightcoral" className="category-lightcoral">
              Red
            </option>
            <option value="lightsalmon" className="category-lightsalmon">
              Orange
            </option>
            <option value="palegoldenrod" className="category-palegoldenrod">
              Yellow
            </option>
            <option value="lightgreen" className="category-lightgreen">
              Green
            </option>
            <option value="lightblue" className="category-lightblue">
              Blue
            </option>
            <option value="plum" className="category-plum">
              Purple
            </option>
            <option value="lightpink" className="category-lightpink">
              Pink
            </option>
            <option value="lightgray" className="category-lightgray">
              Gray
            </option>
            <option value="tan" className="category-tan">
              Brown
            </option>
          </select>
        </div>

        {/* buttons for adding a category or cancelling addition */}
        <button type="submit" className="btn btn-success btn-lg mr-3">
          Add Category
        </button>

        <button
          onClick={() => navigate("/home")}
          className="btn btn-danger btn-lg mr-3"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

// export CreateCategory component
export default CreateCategory;
