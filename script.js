// script.js

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /**
     * addTask
     * - Reads the value from the input
     * - Validates it's not empty
     * - Creates a new <li> with a Remove button
     * - Appends it to the task list and clears the input
     */
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // If input is empty, alert the user and do not add a task
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create the task <li> element and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the <li> from the list
        removeBtn.addEventListener('click', function () {
            // Remove the task list item
            taskList.removeChild(li);
        });

        // Append the remove button to the li, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Add click event listener to the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow adding a task by pressing Enter inside the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Note: Not automatically invoking addTask on DOMContentLoaded,
    // because that would trigger the "Please enter a task." alert when the page loads.
    // All functionality is ready and wired up for user interaction.
});
