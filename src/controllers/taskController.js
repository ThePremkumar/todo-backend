const Task = require('../models/Task');
const mongoose = require('mongoose');

// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      user: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Ensure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, status, priority, dueDate } },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid task ID' });
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Toggle task completion
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task and ensure it belongs to the user
    const task = await Task.findOne({ 
      _id: id, 
      user: req.user.id 
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Toggle the completed status
    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Error toggling task completion:', error);
    res.status(500).json({ 
      message: 'Failed to toggle task completion',
      error: error.message 
    });
  }
};
