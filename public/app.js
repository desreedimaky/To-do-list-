// DOM elements
const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch initial tasks from server
fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => addTaskToDOM(task));
    });

// Add event listener for form submission
form.addEventListener('submit', event => {
    event.preventDefault();

    const taskText = todoInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    // Send task to backend to save
    fetch('/add-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            addTaskToDOM(data);
            todoInput.value = '';
        }
    });
});

// Function to add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    li.innerHTML = `
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    li.prepend(taskText);

    if (task.completed) {
        taskText.classList.add('completed');
    }

    document.getElementById('todo-list').appendChild(li);

    // Handle completion of task
    li.querySelector('.complete-btn').addEventListener('click', () => {
        taskText.classList.toggle('completed');
        fetch(`/complete-task/${task.id}`, { method: 'PUT' });
    });

    // Handle deletion of task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        fetch(`/delete-task/${task.id}`, { method: 'DELETE' });
    });
}
