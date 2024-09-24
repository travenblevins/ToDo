const button = document.querySelector('.top-button');
const input = document.getElementById('input');
const list = document.querySelector('.list-title');

// Declare newButton and taskInput outside the event listener


button.addEventListener('click', function add() {
    const inputValue = input.value;
    if (inputValue !== '') {
        const newItem = document.createElement('li');

        const text = document.createTextNode(inputValue);
        newItem.append(text);

        // Now these variables are assigned globally (in scope of this file)
        taskInput = document.createElement('input');
        taskInput.classList.add('taskInput')
        newItem.append(taskInput);

        const newButton = document.createElement('button');
        newButton.textContent = 'Add a task';
        newItem.append(newButton);

        list.appendChild(newItem);
        input.value = '';
        newButton.addEventListener('click', function () {
            if (taskInput !== '') {
                const task = document.createElement('h3')
                task.textContent = taskInput.value
                newItem.appendChild(task)
                taskInput.value = ''
            }
        })
    }
    
});



