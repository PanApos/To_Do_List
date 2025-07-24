let tasks = [];
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Παρακαλώ εισάγεται κάτι στην λίστα.");
        return; 
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
        }
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';  
    }
 
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();    
}

function toggleTaskStatus(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList'); 
    if (!taskList) {
        console.error("Δεν βρέθηκε το στοιχέιο 'tasklist' . ");
        return;
    }
    taskList.innerHTML = ''; 

   tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;

   // Δημιουργία Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.completed; 

    // Επισήμανση ως ολοκληρωμένη/μη-ολοκληρωμένη
    checkbox.addEventListener('change', () => { 
        toggleTaskStatus(task.id);
    });

    // Δημιουργία Span για το κείμενο της εργασίας
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        taskTextSpan.classList.add('task-text'); 
    if (task.completed) {
            li.classList.add('completed'); 
    }



    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Διαγραφή';
    deleteButton.classList.add('delete-button'); 
    deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(task.id);
    });
        li.appendChild(checkbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        });
}
// --- Εκκίνηση Εφαρμογής ---
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();   
    renderTasks(); 


    if (addTaskButton && taskInput) {
        addTaskButton.addEventListener('click', () => {
            addTask();
        });

        taskInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    } else {
        console.error("Τα στοιχεία για προσθήκη εργασίας (addTaskButton ή taskInput) δεν βρέθηκαν.");
    }
});