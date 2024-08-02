const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// A simple in-memory array to store tasks
let todos = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // To parse JSON request bodies

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// API route to add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  if (newTodo.task) {
    newTodo.id = Date.now();
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ error: 'Task content is required' });
  }
});

// API route to delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== parseInt(id, 10));
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
