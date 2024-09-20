const button = document.querySelector('.button')
const input = document.getElementById('input')
const list = document.querySelector('.list-title')

button.addEventListener('click', function add (){
    const inputValue = input.value
    if (inputValue !== '') {
        const newItem = document.createElement('li')
        newItem.textContent = inputValue
        list.appendChild(newItem)
        input.value = ''
    }
})