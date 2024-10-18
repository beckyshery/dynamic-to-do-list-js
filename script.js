document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to prevent saving again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Create a new list item (li) element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');  // Add a class to the task item

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // Add the 'remove-btn' class

        // Attach event to remove the task when button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTask(taskText);  // Update Local Storage when task is removed
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // If save is true, update Local Storage
        if (save) {
            saveTask(taskText);
        }
    }

    // Save a new task to Local Storage
    function saveTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTask(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);  // Add task and save it to Local Storage
        taskInput.value = '';  // Clear the input field
    });

    // Add event listener for "Enter" key to add tasks
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
            addTask(taskText);  // Add task and save it to Local Storage
            taskInput.value = '';  // Clear the input field
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
