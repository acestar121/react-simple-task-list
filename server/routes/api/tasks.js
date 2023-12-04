const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const validator = require("../validators/tasks.validator");
const Task = require("../../models/Task");

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
router.get("/", async (req, res) => {
  try {
    const result = await Task.find().sort({ date: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// @route   POST api/tasks
// @desc    add task
// @access  Public
router.post(
  "/",
  validator.validationBodyRules,
  validator.checkRules,
  async (req, res) => {
    try {
      const { title, description, status } = req.body;
      const result = await Task.findOne({ title });
      if (result) {
        return res.status(409).send(`'${title}' is already exist.`);
      }

      // add new Task
      let newTask = new Task({ title, description, status });

      // save to db
      const result1 = await newTask.save();

      // send result to a client
      res.status(201).json(result1);
      console.log(`Task Added: ${result1}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// @route   PATCH api/tasks/:id
// @desc    Edit existing task
// @access  Public
router.patch(
  "/:id",
  validator.validationBodyRules,
  validator.checkRules,
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Task Not Found" });
    }

    try {
      const { title, description, status } = req.body;
      const result = await Task.findOne({ title });
      if (result && !result._id.equals(req.params.id)) {
        return res.status(409).send(`'${title}' is already exist.`);
      }
      const updateFields = {
        title,
        description,
        status,
      };

      // update db
      let result1 = await Task.findByIdAndUpdate(
        { _id: id },
        { ...updateFields },
        { new: true }
      );

      if (!result1) {
        return res.status(404).json({ msg: "Task Not Found" });
      }

      // send result to a client
      res.status(200).json(result1);
      console.log(`Task Edited: ${result1}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Public
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Task Not Found." });
  }

  try {
    const result = await Task.findByIdAndDelete(req.params.id);

    if (result) {
      // if the task is existing
      res.status(200).json(result._id);
      console.log(`Task Removed: ${result._id}`);
    } else {
      return res.status(404).json({ msg: "Task Not Found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
