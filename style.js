function getRandomColor() {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (r + g + b > 255); // Ensure the color is dark enough
    
    return `rgb(${r}, ${g}, ${b})`; // Return the RGB string
}

class Task { // Changed class name to Task for convention
    constructor(value, color, id) { // Added color and id parameters
        this.value = value;
        this.color = color; // Store background color for the task
        this.id = id; // Unique ID for each task
    }

    edit(input) {
        this.value = input;
    }
}

class List { // Changed class name to List for convention
    constructor(name) {
        this.name = name;
        this.tasks = []; // Initialize tasks array
    }

    addTask(task) {
        this.tasks.push(task); // Add a task to the list
    }
}

class User { // Changed class name to User for convention
    constructor(name) {
        this.name = name;
        this.lists = []; // Initialize lists array
    }

    addList(list) {
        this.lists.push(list); // Add a list to the user's lists
    }
}

const topButton = document.querySelector('.top-button');
const box = document.querySelector('.box');
const taskHolder = document.querySelector('.taskHolder');
let listIdCounter = 0; // Unique list ID counter
let taskIdCounter = 0; // Unique task ID counter

topButton.addEventListener('click', function add() {
    const listContainer = document.createElement('div');

    const listName = input.value; // Use input value as list name
    const newList = new List(listName); // Create a new list instance

    const newListElement = document.createElement('div');
    newListElement.innerHTML = listName;

    const addButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const inputTask = document.createElement('input');

    inputTask.placeholder = 'Add Task';
    addButton.innerHTML = 'Add Item';
    deleteButton.innerHTML = 'Delete';

    const listItem = document.createElement('div');
    listItem.appendChild(newListElement);
    listItem.appendChild(inputTask);
    listItem.appendChild(addButton);
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        listItem.remove(); // Remove the list from the DOM
        
        // Remove all tasks associated with this list from column 2
        newList.tasks.forEach(task => { // Iterate through tasks and delete them
            const taskElement = document.getElementById(`task-${task.id}`);
            if (taskElement) {
                taskElement.remove(); // Remove corresponding task from column 2
            }
        });
    });

    listItem.classList.add('listItem');

    const backgroundColor = getRandomColor();
    listItem.style.backgroundColor = backgroundColor; // Set background color

    listContainer.appendChild(listItem);
    input.value = ''; // Clear input field

    box.appendChild(listContainer);

    addButton.addEventListener('click', function() {
        const taskValue = inputTask.value; // Get task value
        const taskId = taskIdCounter++; // Increment task ID for uniqueness

        const newTask = new Task(taskValue, backgroundColor, taskId); // Create a new task with value, color, and ID
        newList.addTask(newTask); // Add task to the list

        const newTaskElement = document.createElement('div');
        newTaskElement.innerHTML = taskValue;
        newTaskElement.style.backgroundColor = backgroundColor; // Set the background color for the task

        const editButton = document.createElement('button');
        const deleteTaskButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        deleteTaskButton.innerHTML = 'Delete';

        const taskItem = document.createElement('div');
        taskItem.appendChild(newTaskElement);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteTaskButton);
        taskItem.classList.add('taskItem');
        taskItem.id = `task-${taskId}`; // Assign unique ID to the task

        // Append the task to column 2
        taskHolder.appendChild(taskItem);

        inputTask.value = ''; // Clear task input field

        // Delete individual task
        deleteTaskButton.addEventListener('click', function() {
            taskItem.remove(); // Remove the task from column 2
        });

        // Edit individual task
        editButton.addEventListener('click', function() {
            const editInput = document.createElement('input');
            editInput.placeholder = 'Edit Task';
            editInput.value = taskValue; // Set current task value in input
            
            const saveButton = document.createElement('button');
            saveButton.innerHTML = 'Save';

            // Insert the edit input and save button into the task item
            taskItem.appendChild(editInput);
            taskItem.appendChild(saveButton);

            // Save button functionality
            saveButton.addEventListener('click', function() {
                newTaskElement.innerHTML = editInput.value; // Update task display
                taskItem.removeChild(editInput); // Remove edit input
                taskItem.removeChild(saveButton); 
            });
        });
    });
});
