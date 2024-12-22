const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTasks() {
    if (inputBox.value === '') {
        alert('Please enter a task');
    } else {
        const li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00D7"; // Correct Unicode for ×
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData(); // Save data after toggling checked state
    }
    if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData(); // Save data after removing a task
    }
}, false);

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function loadData() {
    listContainer.innerHTML = localStorage.getItem('data');
    // Ensure event listeners are attached to loaded items
    if (listContainer.innerHTML) {
        listContainer.addEventListener('click', function (e) {
            if (e.target.tagName === 'LI') {
                e.target.classList.toggle('checked');
                saveData();
            }
            if (e.target.tagName === 'SPAN') {
                e.target.parentElement.remove();
                saveData();
            }
        }, false);
    }
}

loadData();

document.getElementById('add-btn').addEventListener('click', addTasks);
