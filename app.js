//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');


//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//functions

function addTodo(event) {
    event.preventDefault();

    //add div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //add new todo
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //store to local
    saveLocalTodos(todoInput.value)

    //complate button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check" />'
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash" />'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        todo.classList.add("fall");

        removeLocalTodos(todo);

        todo.addEventListener('transitionend', () => {
            todo.remove();
        })


    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        addComplete(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = ('flex')
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    
    let completed;
    if (localStorage.getItem('completed') === null) {
        completed = [];
    }
    else {
        completed = JSON.parse(localStorage.getItem('completed'));
    }


    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check" />'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash" />'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })

    completed.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.classList.add("completed");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class = "fas fa-check" />'
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class = "fas fa-trash" />'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}


function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    let completed;
    if (localStorage.getItem('completed') === null) {
        completed = [];
    }
    else {
        completed = JSON.parse(localStorage.getItem('completed'));
    }


    const todoIndex = todo.children[0].innerText;

    if(todos.includes(todoIndex)){
        todos.splice(todos.indexOf(todoIndex), 1);}
    else if(completed.includes(todoIndex)){
        completed.splice(completed.indexOf(todoIndex), 1);}


    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed", JSON.stringify(completed));

}


function addComplete(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    

    
    let completed;
    if (localStorage.getItem('completed') === null) {
        completed = [];
    }
    else {
        completed = JSON.parse(localStorage.getItem('completed'));
    }

    const completedTodoIndex = todo.children[0].innerText;

    if(!completed.includes(completedTodoIndex)){
        completed.push(completedTodoIndex);
        todos.splice(todos.indexOf(completedTodoIndex), 1);
    }
    else{
        completed.splice(completed.indexOf(completedTodoIndex), 1);
        todos.push(completedTodoIndex);
    }


    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completed", JSON.stringify(completed));
}