const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
const User = require("../models/userModel"); // Importing the User model
const createError = require("../utils/appError"); // Importing custom error utility

// Register User
exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Checking if user already exists

    // If user already exists, return error
    if (user) {
      return next(new createError("User already exists", 400));
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Creating new user with hashed password
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    // Assign JWT (json web token) to user
    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "90d",
    });

    // Sending response with token and user details
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error); // Forwarding error to error handling middleware
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Finding user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) return next(new createError("User not found"), 500);

    // Validating password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is invalid, return error
    if (!isPasswordValid) {
      return next(new createError("Invalid password", 401));
    }

    // Assign JWT (json web token) to user
    const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "90d",
    });

    // Sending response with token and user details
    res.status(200).json({
      status: "success",
      token,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error); // Forwarding error to error handling middleware
  }
};
