import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext.jsx";

// Custom hook for login functionality
const useLogin = () => {
  // Using authentication context
  const { login } = useAuth();

  // State variables for error and loading status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Function to handle user login
  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      // Sending login request to server
      const res = await fetch(`http://localhost:3001/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // Parsing response data
      const data = await res.json();

      // Handling response status
      if (res.status === 200) {
        message.success(data.message);
        login(data.token, data.user); // Logging in user
      } else if (res.status === 401) {
        setError(data.message); // Setting error message for unauthorized access
      } else if (res.status === 500) {
        setError(data.message); // Setting error message for internal server error
      } else {
        message.error("Failed to sign in");
      }
    } catch (error) {
      message.error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  // Returning loading status, error message, and login function
  return { loading, error, loginUser };
};

export default useLogin;
