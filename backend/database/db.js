// import Mongoose for MongoDB object modelling
const mongoose = require("mongoose");

// define an asynchronous function to connect to MongoDB database
const connectDb = async () => {
  try {
    // attempt to connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://alessandravendicacion:avjqO1NrPjWqMtQZ@cluster0.s5jpsqe.mongodb.net/OrganizeMe"
    );

    // log success message if connection is successful
    console.log("DB connected successfully");
  } catch (error) {
    // log error message if connection is unsuccessful
    console.log("DB not connected");
  }
};

// export connectDb function to connect to the database
module.exports = connectDb;
