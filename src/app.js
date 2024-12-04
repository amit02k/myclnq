const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(taskRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://amit_singh:kya_hal_hai_tere@cluster0.jpqo2bq.mongodb.net/taskmanager', {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
