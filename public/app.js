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
    
    const taskText = todoInput.value.trim(); // Trim white spaces from the input

    // Check if input is empty
    if (taskText === "") {
        alert("Task cannot be empty!"); // Show an alert if task is empty
        return; // Exit the function if no text is entered
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
            // Display error if duplicate
            alert(data.error);
        } else {
            // Add task to DOM
            addTaskToDOM(data);
            todoInput.value = '';  // Clear the input field
        }
    });
});

// Function to add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    if (task.completed) {
        li.classList.add('completed');
    }

    todoList.appendChild(li);

    // Event listeners for task actions
    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        fetch(`/complete-task/${task.id}`, { method: 'PUT' });
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        fetch(`/delete-task/${task.id}`, { method: 'DELETE' });
    });
}

