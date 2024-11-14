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
            // Add the new task to the DOM
            addTaskToDOM(data);
            // Clear the input field after successful addition
            todoInput.value = '';
        }
    })
    .catch(error => console.error('Error adding task:', error));
});

// Function to add task to the DOM
function addTaskToDOM(task) {
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    // Make the task text editable
    taskText.contentEditable = true;
    taskText.classList.add('editable-text');  // Optional class for custom styling

    // Create buttons (complete and delete)
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Append buttons and task text to the list item
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(completeBtn);
    buttonContainer.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(buttonContainer);

    // Check if the task is already completed and apply the class
    if (task.completed) {
        taskText.classList.add('completed');
    }

    // Append the task to the todo list
    todoList.appendChild(li);

    // Handle completion of the task
    completeBtn.addEventListener('click', () => {
        taskText.classList.toggle('completed');

        // Fetch updated task text (in case it was edited)
        const updatedText = taskText.textContent.trim();

        // Send completion update and edited task text to the server
        fetch(`/complete-task/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: updatedText,
                completed: taskText.classList.contains('completed') // Whether the task is completed or not
            })
        }).catch(error => console.error('Error completing task:', error));
    });

    // Handle deletion of the task
    deleteBtn.addEventListener('click', () => {
        li.remove();

        // Send delete request to the server
        fetch(`/delete-task/${task.id}`, {
            method: 'DELETE'
        }).catch(error => console.error('Error deleting task:', error));
    });
}
