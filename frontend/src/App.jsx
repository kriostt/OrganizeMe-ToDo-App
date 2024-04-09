import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/UserRegistration/Register";
import Login from "./components/UserRegistration/Login";
import { useAuth } from "./contexts/AuthContext";
import CreateToDo from "./components/CreateToDo";
import ReadToDoList from "./components/ReadToDoList";
import CreateCategory from "./components/TaskCategorization/CreateCategory";
import UpdateCategory from "./components/TaskCategorization/UpdateCategory";
import DeleteCategory from "./components/TaskCategorization/DeleteCategory";
import Calendar from "./components/Calendar/Calendar";
import Favourites from "./components/Favourites/Favourites";
import Trash from "./components/Trash/Trash";
import Navbar from "./components/Navbar";
import "./App.css";
import CategoryList from "./components/TaskCategorization/CategoryList";

function App() {
  // Using authentication context to check if user is authenticated
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div>
        {/* display navigation bar */}
        {isAuthenticated && <Navbar />}
        {/* Layout for other components */}
        <div className="content">
          <Routes>
            <Route
              path="/"
              // If user is not authenticated, render Register component, otherwise navigate to Dashboard
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/home" />
              }
            />
            <Route
              path="/login"
              // If user is not authenticated, render Login component, otherwise navigate to Dashboard
              element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              // If user is authenticated, render Dashboard component, otherwise redirect to Login
              element={isAuthenticated ? <ReadToDoList /> : <Login />}
            />

            {/* route for adding a new to do list item */}
            <Route path="/add" element={<CreateToDo />} />

            <Route path="/categories" element={<CategoryList />} />

            {/* route for adding a new category */}
            <Route path="/add-category" element={<CreateCategory />} />

            {/* route for editing a category */}
            <Route path="/edit-category/:id" element={<UpdateCategory />} />

            {/* route for deleting a category */}
            <Route path="/delete-category/:id" element={<DeleteCategory />} />

            <Route path="/calendar" element={<Calendar />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
