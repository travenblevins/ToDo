const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search');

// Add event listener for the search button
searchButton.addEventListener('click', function() {
    const searchValue = searchInput.value.trim(); // Get the trimmed search value
    const backgroundColor = '9134cb'; // Desired background color in hex

    if (!searchValue) {
        alert('No input found');
        return; // Prevent further execution if the input is empty
    }

    const listItems = document.querySelectorAll('.listItem'); // Select all list items
    let matchFound = false; // Flag to track if any match is found

    listItems.forEach(listItem => {
        const listText = listItem.firstChild.textContent.toLowerCase(); // Get list name text
        let listMatch = false; // Flag for matching list item

        // Highlight the list item if it matches the search value
        if (listText.includes(searchValue.toLowerCase())) {
            listItem.style.backgroundColor = `#${backgroundColor}`; // Highlight the matched list item
            listMatch = true; // Set list match flag to true
            matchFound = true; // Set match found flag to true
        } else {
            listItem.style.backgroundColor = ''; // Reset background color if not matched
        }

        // Select all task items within this list
        const taskItems = listItem.querySelectorAll('.taskItem'); 

        taskItems.forEach(item => {
            const taskText = item.firstChild.textContent.toLowerCase(); // Get the text content of the task
            if (taskText.includes(searchValue.toLowerCase())) { // Check if it includes the search value
                item.style.backgroundColor = `#${backgroundColor}`; // Highlight the matched task item
                matchFound = true; // Set match found flag to true
            } else {
                item.style.backgroundColor = ''; // Reset background color if not matched
            }
        });

        // If the list has matching tasks, highlight it too
        if (listMatch) {
            listItem.style.backgroundColor = `#${backgroundColor}`; // Highlight the matched list item
        }
    });

    if (!matchFound) {
        alert('No match found'); // Alert if no tasks or lists match the search
    }
});


function getRandomColor() {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while (r + g + b > 255); // Ensure the color is dark enough

    return `rgb(${r}, ${g}, ${b})`; // Return the RGB string
}

class Task {
    constructor(value, color, id, completed = false) {
        this.value = value;
        this.color = color;
        this.id = id;
        this.completed = completed; // Track completion status
    }

    edit(input) {
        this.value = input;
    }
}

class List {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

const input = document.querySelector('#input');
const topButton = document.querySelector('.top-button');
const box = document.querySelector('.box');
const taskHolder = document.querySelector('.taskHolder');
const resetButton = document.querySelector('.reset-button'); // Reference the reset button
let taskIdCounter = 0; // Unique task ID counter

topButton.addEventListener('click', function add() {
    const listName = input.value;
    if (!listName) return; // Prevent empty list names

    const newList = new List(listName);
    const backgroundColor = getRandomColor(); // Generate a random background color

    const listItem = document.createElement('div');
    listItem.classList.add('listItem');
    listItem.style.backgroundColor = backgroundColor;

    const newListElement = document.createElement('div');
    newListElement.innerHTML = listName;

    const inputTask = document.createElement('input');
    inputTask.placeholder = 'Add Task';

    const addButton = document.createElement('button');
    addButton.innerHTML = 'Add Item';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';

    listItem.appendChild(newListElement);
    listItem.appendChild(inputTask);
    listItem.appendChild(addButton);
    listItem.appendChild(deleteButton);
    
    box.appendChild(listItem);
    input.value = ''; // Clear input field
    saveToLocalStorage

    deleteButton.addEventListener('click', function() {
        const listItem = this.parentElement; // Get the parent list item (the current list)
        const listColor = listItem.style.backgroundColor; // Get the list's background color
    
        // Loop through all tasks in the taskHolder
        const allTasks = taskHolder.querySelectorAll('.taskItem');
        allTasks.forEach(task => {
            if (task.style.backgroundColor === listColor) {
                task.remove(); // Remove the task if its background color matches the list
            }
        });
    
        listItem.remove(); // Remove the list from the DOM
        saveToLocalStorage(); // Save changes to local storage
    });
    
    

    addButton.addEventListener('click', function() {
        const taskValue = inputTask.value;
        if (!taskValue) return; // Prevent empty tasks

        const taskId = taskIdCounter++;
        const newTask = new Task(taskValue, backgroundColor, taskId);
        newList.addTask(newTask); // Add the new task to the list

        const taskItem = createTaskElement(newTask); // Create the task element
        taskHolder.appendChild(taskItem); // Append to task holder
        inputTask.value = ''; // Clear task input field

        saveToLocalStorage(); // Save to local storage
    });

    box.appendChild(listItem);
    saveToLocalStorage(); // Save to local storage
});

function createTaskElement(task) {
    const newTaskElement = document.createElement('div');
    newTaskElement.innerHTML = task.value;

    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');
    taskItem.id = `task-${task.id}`;
    taskItem.style.backgroundColor = task.color; // Set background color

    const editButton = document.createElement('button');
    const deleteTaskButton = document.createElement('button');
    const completedButton = document.createElement('button');

    editButton.innerHTML = 'Edit';
    deleteTaskButton.innerHTML = 'Delete';
    completedButton.innerHTML = task.completed ? 'Undo' : 'Completed';

    taskItem.appendChild(newTaskElement);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteTaskButton);
    taskItem.appendChild(completedButton);

    // Mark task as completed if it is
    if (task.completed) {
        taskItem.style.textDecoration = 'line-through';
    }

    completedButton.addEventListener('click', function() {
        task.completed = !task.completed; // Toggle completion status
        taskItem.style.textDecoration = task.completed ? 'line-through' : 'none';
        completedButton.innerHTML = task.completed ? 'Undo' : 'Completed'; // Update button text
        saveToLocalStorage(); // Save to local storage
    });

    deleteTaskButton.addEventListener('click', function() {
        taskItem.remove(); // Remove the task from the DOM
    });

    editButton.addEventListener('click', function() {
        if (!taskItem.querySelector('input')) {
            const editInput = document.createElement('input');
            editInput.value = task.value;

            const saveButton = document.createElement('button');
            saveButton.innerHTML = 'Save';

            taskItem.appendChild(editInput);
            taskItem.appendChild(saveButton);

            saveButton.addEventListener('click', function() {
                task.value = editInput.value; // Update task value
                newTaskElement.innerHTML = task.value; // Update displayed task value
                taskItem.removeChild(editInput); // Remove edit input
                taskItem.removeChild(saveButton); // Remove save button
                saveToLocalStorage(); // Save to local storage
            });
        }
    });

    return taskItem; // Return the created task element
}

function saveToLocalStorage() {
    const lists = [];
    document.querySelectorAll('.listItem').forEach(listItem => {
        const listName = listItem.querySelector('div').textContent;
        const backgroundColor = listItem.style.backgroundColor;
        const tasks = Array.from(taskHolder.querySelectorAll('.taskItem')).map(taskItem => {
            return {
                value: taskItem.querySelector('div').textContent,
                color: taskItem.style.backgroundColor,
                id: taskItem.id.split('-')[1],
                completed: taskItem.style.textDecoration === 'line-through' // Track completion status
            };
        });
        lists.push({ name: listName, tasks, backgroundColor });
    });
    localStorage.setItem('taskLists', JSON.stringify(lists));
}

function restoreList(listData) {
    const listItem = document.createElement('div');
    listItem.classList.add('listItem');
    listItem.style.backgroundColor = listData.backgroundColor; // Set background color

    const newListElement = document.createElement('div');
    newListElement.innerHTML = listData.name;

    listItem.appendChild(newListElement);

    const inputTask = document.createElement('input');
    inputTask.placeholder = 'Add Task';
    const addButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    addButton.innerHTML = 'Add Item';
    deleteButton.innerHTML = 'Delete';

    listItem.appendChild(inputTask);
    listItem.appendChild(addButton);
    listItem.appendChild(deleteButton);

    // Event listener for the delete button
    deleteButton.addEventListener('click', function() {
        const listItem = this.parentElement; // Get the parent list item (the current list)
        const listColor = listItem.style.backgroundColor; // Get the list's background color
    
        // Loop through all tasks in the taskHolder
        const allTasks = taskHolder.querySelectorAll('.taskItem');
        allTasks.forEach(task => {
            if (task.style.backgroundColor === listColor) {
                task.remove(); // Remove the task if its background color matches the list
            }
        });
    
        listItem.remove(); // Remove the list from the DOM
        saveToLocalStorage(); // Save changes to local storage
    });
    
    

    // Event listener for the add button
    addButton.addEventListener('click', function() {
        const taskValue = inputTask.value;
        if (!taskValue) return; // Prevent empty tasks

        const taskId = taskIdCounter++;
        const newTask = new Task(taskValue, listData.backgroundColor, taskId);
        listData.tasks.push(newTask); // Add to the restored list's tasks

        const taskItem = createTaskElement(newTask); // Create the task element
        taskHolder.appendChild(taskItem); // Append taskItem to the taskHolder (column 2)
        inputTask.value = ''; // Clear task input field

        saveToLocalStorage(); // Save to local storage
    });

    // Restore tasks for this list
    listData.tasks.forEach(task => {
        const newTask = new Task(task.value, task.color, task.id, task.completed); // Restore completed state
        const taskItem = createTaskElement(newTask); // Create the task element
        taskItem.style.textDecoration = task.completed ? 'line-through' : 'none'; // Set completion style
        taskHolder.appendChild(taskItem); // Append taskItem to the taskHolder (column 2)
    });

    box.appendChild(listItem); // Append the list to the main box
}


function loadFromLocalStorage() {
    const savedData = localStorage.getItem('taskLists');
    if (savedData) {
        const lists = JSON.parse(savedData);
        lists.forEach(listData => restoreList(listData)); // Restore each list
    }
}

// Event listener for reset button
resetButton.addEventListener('click', function() {
    // Clear only the taskHolder and box elements (remove existing lists and tasks)
    document.querySelectorAll('.listItem').forEach(listItem => listItem.remove()); // Remove all lists
    taskHolder.innerHTML = ''; // Clear all tasks

    // Clear local storage
    localStorage.removeItem('taskLists');
});

// Load saved data when the page loads
window.onload = loadFromLocalStorage;
