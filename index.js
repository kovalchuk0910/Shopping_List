const addTaskInput = document.querySelector('.addTaskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const newData = document.querySelector('.newData');

let tasksArr;
let getTasks = JSON.parse(localStorage.getItem('tasks'));
getTasks ? tasksArr = getTasks : tasksArr = [];

let todoItems = [];

function Tasks(item) {
    this.item = item;
    this.completed = false;
}

addTaskBtn.addEventListener('click', () => {
    if(addTaskInput.value !== "") {
        tasksArr.push(new Tasks(addTaskInput.value));
        update();
        addTaskInput.value = '';
    }
})

const drawTasks = (item, index) => {
    return `
        <div class="todo-item ${item.completed ? 'checked' : ''}">
            <input class="todo-checkbox" type="checkbox" ${item.completed ? 'checked' : ''} onclick="completeTask(${index})"/>
            <p class="todo-desc">${item.item}</p>
            <button class="todo-button" onclick="deleteTask(${index})"><img src="images/deleteIcon.png"></button>
        </div>
    `
}

function fillTasks() {
    newData.innerHTML = '';
    if(tasksArr.length > 0) {
        tasksArr.forEach((item, index) => {
            newData.innerHTML += drawTasks(item, index);
        });
        todoItems = document.querySelectorAll('.todo-item');
    } else {
        newData.innerHTML = "No items"
    }
}
fillTasks();

const updateStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

function update() {
    updateStorage();
    fillTasks();
}

function deleteTask(index) {
    tasksArr.splice(index, 1);
    update();
}

function completeTask(index) {
    tasksArr[index].completed = !tasksArr[index].completed;
    if(tasksArr[index].completed) {
        todoItems[index].classList.add('.checked');
    } else {
        todoItems[index].classList.remove('.checked');
    }
    update();
}