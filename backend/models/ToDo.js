// import Mongoose for MongoDB object modelling
const mongoose = require("mongoose");

// define the schema for ToDo model
const Schema = mongoose.Schema;

// create new schema for ToDo model
const toDoSchema = new Schema({
  // note: _id is automatically generated by Mongoose

  // field for todo category
  category: {
    type: Schema.Types.ObjectId,
    // establish reference to Category model
    ref: "Category",
  },

  // field for todo title
  title: {
    type: String,
    // title input is required
    required: true,
  },

  // field for todo description
  description: {
    type: String,
  },

  // field for todo due date
  dueDate: {
    type: Date,
  },

  //field for bin
  bin: {
    type: Boolean,
    default: false,
  },
});

// define ToDo model based on schema
// use mongoose.models.ToDo if already defined, else define a new model
const ToDo = mongoose.models.ToDo || mongoose.model("ToDo", toDoSchema);

// export ToDo model
module.exports = ToDo;
