const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

let tasks = []; // Temporary in-memory task storage (use file/db if needed)

// Load tasks from a file (optional for persistence)
const loadTasks = () => {
    if (fs.existsSync('tasks.json')) {
        tasks = JSON.parse(fs.readFileSync('tasks.json', 'utf8'));
    }
};

// Save tasks to a file (optional for persistence)
const saveTasks = () => {
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

// Load tasks on startup
loadTasks();

// Route to get tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route to add a new task (check for duplicates)
app.post('/add-task', (req, res) => {
    const taskText = req.body.text.trim().toLowerCase();

    // Check if the task already exists (case insensitive)
    const duplicateTask = tasks.find(task => task.text.trim().toLowerCase() === taskText);
    
    if (duplicateTask) {
        // Send an error response if the task is a duplicate
        res.json({ error: 'Task already exists!' });
    } else {
        const newTask = {
            id: tasks.length + 1,  // Assign a unique ID based on array length
            text: req.body.text,
            completed: req.body.completed || false
        };

        tasks.push(newTask);  // Push the new task to the array
        saveTasks();  // Save tasks to file (optional)
        res.json(newTask);  // Send the new task back as confirmation
    }
});

// Route to mark a task as complete/incomplete
app.put('/complete-task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Route to delete a task
app.delete('/delete-task/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    saveTasks();
    res.sendStatus(200);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
