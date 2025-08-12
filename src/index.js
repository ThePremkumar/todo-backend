const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet());
app.use(express.json()); // extended is not needed here

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/tasks', require('./routes/tasks.js'));

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
