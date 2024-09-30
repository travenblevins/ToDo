class task {
    constructor(value) {
    this.value = value
    }
    edit(input) {
        this.value = input
    }

    markCompleted(value) {
        value.background = 'green'
    }


}

class list {
    constructor(task, id) {
        this.task = task
    }

    removeTask(task) {
        task.remove()
    }

    addTask(input) {
        const newTask = input.value
    }
}

class user {
    constructor(name, list) {
        this.name = name
        this.list = list
        id = 'user'
    }
    addlist() {

    }
}



const topButton = document.querySelector('.top-button');
box = document.querySelector('.box');

// Declare newButton and taskInput outside the event listener

topButton.addEventListener('click', function add() {
    const listContainer = document.createElement('div')

    const newList = new task(input.value);

    const newListElement = document.createElement('div');

    newListElement.innerHTML = input.value;

    const addButton = document.createElement('button');

    const inputTask = document.createElement('input');

    addButton.innerHTML = 'Add Item';

    const listItem = document.createElement('div');

    listItem.appendChild(newListElement)

    listItem.appendChild(inputTask)
    
    listItem.appendChild(addButton)

    listItem.classList.add('row')

    listContainer.appendChild(listItem)

    input.value = ''

    box.appendChild(listContainer)
    addButton.addEventListener('click', function() {
        const newTask = new task(inputTask.value)

        const newTaskElement = document.createElement('div')

        newTaskElement.classList.add('column')

        newTaskElement.innerHTML = inputTask.value

        editButton = document.createElement('button')

        editButton.innerHTML = 'Edit'

        deleteButton = document.createElement('button')

        deleteButton.innerHTML = 'Delete'

        const taskItem = document.createElement('div')

        taskItem.appendChild(newTaskElement)

        taskItem.appendChild(editButton)

        taskItem.appendChild(deleteButton)

        taskItem.classList.add('row')

        listContainer.appendChild(taskItem)
    })
});



