const express = require('express');
const data = require('./tasks');

const app = express();

app.use(express.json());

const dataPut = {
    name: 'Hardik Savani',
    job: 'Blog Writer'
};

app.get('/tasks', (req, res) => {
    res.json(data.tasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;

    const task = data.tasks.find(element => element.id == id);

    if (!task) {
        res.status(404);
        res.json({ error: "Task with this id doesn't exist"});
        return;
    }

    res.json(task);
});

app.post('/tasks', (req, res) => {
    const message = req.body.message;

    const existingTask = data.tasks.find(task => task.message === message);

    if (existingTask) {
        res.status(400);
        res.json({ error: 'Task with given message already exists'});
        return;
    }

    const task = {
        id: Math.max(...data.tasks.map(task => task.id)) + 1,
        message: message,
    };

    data.tasks.push(message);

    res.status(201);
    res.json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = {
        id: Math.max(...data.tasks.map(task => task.id)) + 1,
        message: req.body.message,
    };

    data.tasks.push(task);

    res.json(data.tasks);
});

app.delete('/tasks/:id', (req, res) => {
    const taskDelete = req.body.id;

    data.tasks.splice(taskDelete - 1, 1);

    res.json(data.tasks);
});

app.listen(3000);