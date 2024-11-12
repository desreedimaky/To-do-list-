# To-do-list-

#Project Overview
This project is a **To-Do List** web application built using HTML, CSS, JavaScript (ES6), and Node.js. The app allows users to add, mark as complete, and delete tasks from a dynamic to-do list. It also ensures that duplicate tasks are not allowed and the list is saved for the user's session.

#Features:
- **Add Task**: Users can add new tasks to the to-do list.
- **Prevent Duplicate Tasks**: Duplicate tasks are not allowed in the list.
- **Mark Task as Complete**: Users can mark tasks as completed, which strikes through the task text.
- **Delete Task**: Users can delete individual tasks from the list.
- **Responsive Design**: The layout adjusts for different screen sizes, ensuring usability on smaller screens.
- **Node.js Backend**: The app uses Node.js to serve the static files and manage tasks.

#How to Use
-Add Task: Enter a task in the input box and click Add Task. The task will be added to the list below.
-Mark Complete: Click on the Complete button next to a task to mark it as complete. The task text will be struck through.
-Delete Task: Click on the Delete button to remove the task from the list.
-Prevent Duplicate Tasks: If you try to add a task that already exists in the list, the app will notify you and prevent adding it again.


#Tech Stack
- **Frontend**: HTML, CSS, JavaScript (ES6)
- **Backend**: Node.js with Express.js (for serving the app)
- **Styling**: Custom CSS for design and layout

---

## Setup and Installation

#Prerequisites
- **Node.js** installed on your system. If not, download and install it from [here](https://nodejs.org/).

#Steps to Run Locally:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/todo-list-app.git
    cd todo-list-app
    ```

2. **Install dependencies**:
    Run the following command to install the necessary Node.js packages.
    ```bash
    npm install
    ```

3. **Run the application**:
    Start the Node.js server with this command:
    ```bash
    npm start
    ```
    By default, the app will run at `http://localhost:3000`.

4. **Open the app**:
    Open your browser and visit `http://localhost:3000` to see the To-Do List application in action.

---

## Project Structure

```bash
.
├── public
│   ├── css
│   │   └── style.css        # Contains the styles for the To-Do List UI
│   ├── images               # Image folder for storing icons
│   ├── js
│   │   └── app.js           # Contains the frontend JavaScript logic
│   └── index.html           # Main HTML file for the To-Do List UI
├── server.js                # Backend logic with Node.js and Express.js
├── package.json             # Node.js project dependencies and scripts
└── README.md                # This file (Project documentation)


