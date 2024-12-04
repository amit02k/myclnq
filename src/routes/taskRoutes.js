const express = require('express');
const router = express.Router();
const Task = require('../model/task');

// Create Task
router.post('/tasks', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        const { __v, ...taskWithoutV } = savedTask.toObject();

        res.status(201).json({
            message: 'Task created successfully',
            task: taskWithoutV,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Get All Tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().select({__v:0});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Update Task
router.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true }).select({__v:0});
        if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete Task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Filter Tasks by Status
router.get('/tasks/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const tasks = await Task.find({ status }).select({__v:0});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to filter tasks' });
    }
});

module.exports = router;
