const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Schema
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

// Create Todo
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  const todo = new Todo({ title, description });
  await todo.save();
  res.status(201).json(todo);
});

// Get Todos with Pagination
app.get('/todos', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 });
  res.json(todos);
});

// Get Single Todo
app.get('/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

// Update Todo
app.put('/todos/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
