
let tasks = [
]
let id = 0;
let editId = 0

function addTask(taskName) {
    const newTask = {
        'id': id + 1,
        'task': taskName,
        'status': false
    }
    tasks.push(newTask);
    id++;
}

function toggleTaskStatus(taskId) {
    for(const task of tasks) {
        if(task.id === taskId) {
            task.status = !task.status;
        }
    }
}

function onTaskClickHandler(e) {
    toggleTaskStatus(Number(e.target.id));
    renderList();
}

function onDeleteBtnClickHandler(e) {
    const taskId = Number(e.target.id.slice(3));
    console.log('Delete button clicked, id:', taskId);
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === taskId) {
            tasks.splice(i, 1);
            break;
        }
    }
    renderList();
}


function onEditBtnClickHandler(e) {
    const taskId = Number(e.target.id.slice(4));
    const editTaskField = document.getElementById('new_task');
    console.log('Edit button clicked, id:', taskId);
    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === taskId) {
            editTaskField.value = tasks[i].task;
            editI
            break;
        }
    }
}

function renderList() {
    const list = document.getElementById('task_list');
    list.innerHTML = '';
    for(const task of tasks) {
        const listItem = document.createElement('li');
        const checkBox = document.createElement('input');
        const label = document.createElement('label');
        const deleteBtn = document.createElement('button');
        const editBtn = document.createElement('button');

        checkBox.type = 'checkbox';
        checkBox.id = task.id;
        checkBox.checked = task.status;
        checkBox.addEventListener('click', onTaskClickHandler);

        label.htmlFor = task.id;
        label.innerText = task.task;

        deleteBtn.innerText = 'D';
        deleteBtn.classList.add('delete_btn');
        deleteBtn.id = 'del' + task.id;
        deleteBtn.addEventListener('click', onDeleteBtnClickHandler);

        editBtn.innerText = 'E';
        editBtn.classList.add('edit_btn');
        editBtn.id = 'edit' + task.id;
        editBtn.addEventListener('click', onEditBtnClickHandler)

        listItem.classList.add('task');
        listItem.id = 'item' + task.id;

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
        
    }
}


function onAddBtnClickHandler(event) {
    renderList();
    const newTaskField = document.getElementById('new_task');
    const newTask = newTaskField.value;
    if(newTask === '') {
        alert('Please enter a task');
        return;
    } else {
        addTask(newTask);
        newTaskField.value = '';
        renderList();
        console.log('Tasks Array:', tasks);
    }
}


const addBtn = document.getElementById('add_btn');
addBtn.addEventListener('click', onAddBtnClickHandler);

const delAllBtn = document.getElementById('del_all_btn');
delAllBtn.addEventListener('click', () => {
    tasks = [];
    renderList();
});
