import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoryList = () => {
  // state variable for categories
  const [categories, setCategories] = useState([]);

  // hook to navigate between pages
  const navigate = useNavigate();

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

  return (
    <div>
      <h2 id="categories-header">Available Categories</h2>

      <Link to="/add-category" className="btn btn-primary-category">
        Add Category
      </Link>

      {/* check if list of categories exists */}
      {categories && categories.length > 0 ? (
        // display table of available categories
        <table className="table table-bordered">
          {/* table column titles */}
          <thead className="thead-light">
            <tr>
              <th className="column-header col-2" scope="col">
                Colour
              </th>
              <th className="column-header" scope="col">
                Name
              </th>
              <th className="column-header col-2">Actions</th>
            </tr>
          </thead>

          {/* table rows */}
          <tbody>
            {/* map through list of categories and display each item in table row */}
            {categories.map((category) => (
              <tr key={category._id}>
                {/* set the colour of the colour table cell to match the text */}
                <td
                  className={`text-center custom-category-${
                    category && category.colour ? category.colour : "default"
                  }`}
                >
                  {formatColourString(category.colour)}
                </td>

                <td className="text-center">{category.name}</td>

                {/* buttons to edit or delete category*/}
                <td className="text-center">
                  <div className="icon-container">
                    <FaEdit
                      className="edit-icon mr-2"
                      onClick={() => navigate(`/edit-category/${category._id}`)}
                    />

                    <FaTrash
                      className="delete-icon"
                      onClick={() =>
                        navigate(`/delete-category/${category._id}`)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // display message if there's no available categories
        <p className="no-categories-message">No categories are available.</p>
      )}
    </div>
  );
};

export default CategoryList;
