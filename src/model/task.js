const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
});

module.exports = mongoose.model('Task', TaskSchema);
