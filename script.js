// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ---- Local Storage helpers ----
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    function saveStoredTasks(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // ---- Load tasks from Local Storage ----
    function loadTasks() {
        const storedTasks = getStoredTasks();
        storedTasks.forEach(taskText => addTask(taskText, false)); // don't re-save while loading
    }

    /**
     * addTask
     * @param {string} taskText - text of the task to add
     * @param {boolean} [save=true] - whether to save to Local Storage
     * - Creates a new <li> with a Remove button
     * - Appends to the task list
     * - Optionally saves to Local Storage
     */
    function addTask(taskText, save = true) {
        const trimmed = (taskText || '').trim();
        if (trimmed === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and set its text
        const li = document.createElement('li');
        li.textContent = trimmed;
        // Store raw task text on the element for reliable removal
        li.dataset.task = trimmed;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign onclick to remove the li and update Local Storage
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from Local Storage (first matching occurrence)
            const tasks = getStoredTasks();
            const idx = tasks.indexOf(li.dataset.task);
            if (idx !== -1) {
                tasks.splice(idx, 1);
                saveStoredTasks(tasks);
            }
        };

        // Append button to li, then li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage (when invoked by user, not during load)
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(trimmed);
            saveStoredTasks(tasks);
        }
    }

    // Wrapper to read input and call addTask
    function handleAddFromInput() {
        const inputValue = taskInput.value;
        addTask(inputValue, true);
        taskInput.value = '';
        taskInput.focus();
    }

    // ---- Event listeners ----
    addButton.addEventListener('click', handleAddFromInput);

    // Add by pressing Enter in the input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            handleAddFromInput();
        }
    });

    // Load saved tasks on page load
    loadTasks();
});
