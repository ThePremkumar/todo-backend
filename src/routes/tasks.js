const express = require('express');
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask,
  toggleTaskCompletion
} = require('../controllers/taskController');
const auth = require('../middlewares/auth');

router.get('/', auth, getTasks);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.patch('/:id/toggle',auth, toggleTaskCompletion);
// PUT /api/tasks/:id
router.put('/:id', auth, async (req, res) => {
  try {
    // $set allows partial updates, e.g., { completed: true }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },       // <-- THIS is where completed gets updated
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);  // <-- ALWAYS return the updated task as JSON
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id); // <--- Use this
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server Error" });
  }
});




module.exports = router;
