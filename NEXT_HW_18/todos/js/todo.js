const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const content = document.getElementById('content');
const TODOS_KEY = "todos";
let todos = [];

function submitAddTodo(event) {
    event.preventDefault();
    const todoText = content.value;
    const newTodo = {
        text: todoText,
        id: Date.now(),
    };

    todos.push(newTodo);
    content.value = '';
    paintTodo(newTodo);
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.innerText = newTodo.text;
    button.innerText = '삭제';
    button.addEventListener('click', deleteTodo);

    li.appendChild(span);
    li.appendChild(button);
    todoList.appendChild(li);
}

function saveTodos() {
    window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.remove();

    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
}

let tempTodos = JSON.parse(window.localStorage.getItem(TODOS_KEY));
if (tempTodos !== null) {
    todos = tempTodos;
    todos.forEach((todo) => {
        paintTodo(todo);
    });
}

todoForm.addEventListener("submit", submitAddTodo);
