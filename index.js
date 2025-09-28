const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db.js');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
// app.use(cors({
//   origin: ['https://prioritypoint.netlify.app', 'http://localhost:5173', 'https://www.fastcron.com/'],
//   credentials: true,
// }));

app.use(cors({
  origin:'*',
  credentials: true,
}));

app.use(helmet());
app.use(express.json()); // extended is not needed here

// Routes
app.use('/api/auth', require('./src/routes/auth.js'));
app.use('/api/tasks', require('./src/routes/tasks.js'));

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
