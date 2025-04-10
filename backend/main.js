const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const todoRoutes = require('./routes/todoRoutes.js');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));