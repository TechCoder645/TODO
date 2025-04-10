// server/controllers/todoController.js

import Todo from '../models/Todo.js';

export const createTodo = async (req, res) => {
  const { title, content } = req.body;
  const todo = new Todo({ title, content });
  await todo.save();
  res.status(201).json(todo);
};

export const getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const todos = await Todo.find()
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  res.json(todos);
};

export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
