// Select HTML elements
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Get todos from local storage or initialize empty array
let allTodos = []; // Will be populated after fetching/loading

// --- Configuration for fetching todos.json from GitHub Repo ---
// This will be used when hosted on GitHub Pages.
// Replace 'YOUR_USERNAME' and 'YOUR_REPONAME' if you use a different structure
const GITHUB_USERNAME = 'NIthishGudipati'; // Replace with your GitHub username
const GITHUB_REPONAME = 'priority-todo-list'; // Replace with your repository name

// Event listener for form submission
todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload

    addTodo();
});

// Add a new todo
function addTodo() {
    let todoText = todoInput.value.trim();

    if (todoText.length > 0) {
        // Create todo object with text and completed status
        const todo = {
            text: todoText,
            completed: false
        };

        allTodos.push(todo);
        updateTodoList();
        saveTodos();

        todoInput.value = ''; // Clear input field
    }
}

// Create a todo list item element
function createTodoItem(todo, index) {
    const todoId = `todo-${index}`;

    const li = document.createElement('li');
    li.classList.add('todo'); // Add the 'todo' class to the li for styling if needed
    if (todo.completed) {
        li.classList.add('completed'); // Optional: class for styling completed tasks
    }

    // Set the inner HTML of the list item
    li.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">${todo.text}</label>
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"> {/* REMOVED fill attribute here */}
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    // Checkbox event listener to toggle completed status
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        allTodos[index].completed = checkbox.checked;
        saveTodos();
        updateTodoList();
    });

    // Delete button event listener
    const deleteButton = li.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
        deleteTodoItem(index);
    });

    return li;
}

// Update the todo list display
function updateTodoList() {
    todoList.innerHTML = '';
    allTodos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });
}

// Save todos to local storage
function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
}

// Get todos from local storage
function getTodos() {
    const todosJson = localStorage.getItem('todos') || '[]';
    return JSON.parse(todosJson);
}

// Delete a todo item
function deleteTodoItem(index) {
    allTodos = allTodos.filter((_, i) => i !== index);
    saveTodos();
    updateTodoList();
}

// Initialize the app by loading todos and updating the list
updateTodoList();

