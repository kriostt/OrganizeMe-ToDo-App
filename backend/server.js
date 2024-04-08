// import Morgan for HTTP request logging
const morgan = require("morgan");
// import body-parser middleware for parsing request bodies
const bodyParser = require("body-parser");
// import cors for cross-origin resource sharing (security)
const cors = require("cors");

// import custom function for connection to MongoDB
const connectDb = require("./database/db");
// import routes
const toDoRoutes = require("./routes/toDo");
const calendarRoutes = require("./routes/calendar");
const categoryRoutes = require("./routes/category");
const userRoutes = require("./routes/user");

// import Express.js framework
const express = require("express");
// create an instance of Express application
const app = express();

// connect to MongoDB cloud database
connectDb();

// set up middleware
var corsOptions = {
  origin: `http://localhost:5173`, // Specifying the allowed origin for CORS requests
  methods: "GET, POST, PATCH, PUT, DELETE", // Specifying the allowed HTTP methods
};
app.use(cors(corsOptions)); // enable cross-origin resource sharing
app.use(express.json());
app.use(morgan("dev")); // use Morgan for logging HTTP requests
app.use(bodyParser.urlencoded({ extended: true })); // parse url-encoded bodies
app.use(bodyParser.json()); // parse JSON bodies

// load routes
app.use("/", toDoRoutes); // mount to do routes on root path
app.use("/", calendarRoutes);
app.use("/", userRoutes);
app.use("/", categoryRoutes); // mount category routes on root path

// global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

// set port for the server
const PORT = process.env.PORT || 3001;
// start the server and log the port it's running on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
