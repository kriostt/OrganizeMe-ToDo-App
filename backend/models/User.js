// Importing Mongoose module
const mongoose = require("mongoose");

// Defining user schema using Mongoose Schema class
const userSchema = new mongoose.Schema({
  // Defining firstName field with type String and required validation
  firstName: {
    type: String,
    required: true,
  },
  // Defining lastName field with type String and required validation
  lastName: {
    type: String,
    required: true,
  },
  // Defining email field with type String and required validation
  email: {
    type: String,
    required: true,
  },
  // Defining password field with type String and required validation
  password: {
    type: String,
    required: true,
  },
});

// Creating User model using userSchema
const User = mongoose.models.userModel || mongoose.model("User", userSchema);

module.exports = User; // Exporting the User model
