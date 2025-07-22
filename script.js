
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Παρακαλώ εισάγεται κάτι στην λίστα.");
        return; 
    }

    const listItem = document.createElement('li');
    listItem.textContent = taskText; 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Διαγραφή';
    deleteButton.classList.add('delete-button'); 
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem); 
    });
    
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed'); 
    });
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
    taskInput.value = "";
}
addTaskButton.addEventListener('click', addTask); 
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});