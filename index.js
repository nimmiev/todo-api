const express = require('express');
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

let todos = [
    { id: 1, title: 'To-Do 1', completed: false },
    { id: 2, title: 'To-Do 2', completed: true },
    { id: 3, title: 'To-Do 3', completed: false }   
];

// create a to-do
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// read all to-dos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// single to-do read
app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'To-Do not found' });
    }
    res.json(todo);
});

// update a to-do
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
        return res.status(404).json({ error: 'To-Do not found' });
    }

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

// delete a to-do
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'To-Do not found' });
    }

    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo[0]);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
