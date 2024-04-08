// import necessary modules
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// component for deleting categories
const DeleteCategory = () => {
  // hook to navigate between pages
  const navigate = useNavigate();

  // extract paramters from URL
  let { id } = useParams();

  // delete category
  const deleteCategory = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/delete-category/${id}`);

      if (res.status === 200) {
        // if successful, display success message and return to add categories page
        alert(res.data.message);
        navigate("/add-category");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // JSX for the delete category page
  return (
    <div>
      <h2>Delete Category</h2>

      <p>Do you really want to delete this category?</p>

      {/* buttons for confirming or canceling contact deletion */}
      <button onClick={deleteCategory} class="btn btn-danger btn-lg mr-3">
        Yes
      </button>

      <button
        onClick={() => navigate("/add-category")}
        class="btn btn-primary btn-lg mr-3"
      >
        No
      </button>
    </div>
  );
};

// export DeleteCategory component
export default DeleteCategory;
