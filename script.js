// script.js
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // addTask: create a new task <li>, add a Remove button, append to taskList
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign onclick to remove the li from the list when clicked
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append the remove button to the li, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear and focus the input
        taskInput.value = '';
        taskInput.focus();
    }

    // Call addTask when the Add Task button is clicked
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter inside the input to add a task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
