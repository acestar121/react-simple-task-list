const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "To Do",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
