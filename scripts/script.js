const newTodoForm = document.querySelector("#new-todo-form");
const nameInput = document.querySelector("#name");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// RENDER USERNAME
const username = localStorage.getItem("username") || "";
nameInput.value = username;

// SAVE USERNAME
nameInput.addEventListener("change", (e) => {
  localStorage.setItem("username", e.target.value);
});

// SUBMIT FORM
newTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = {
    content: e.target.elements.content.value,
    category: e.target.elements.category.value,
    done: false,
  };

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
  e.target.reset();

  DisplayTodos();
});

DisplayTodos();

// RENDER TODOS
function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("work");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);
  });

  checkTodos();
  editTodos();
  deleteTodos();
}

// CHECK TODOS
function checkTodos() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem, index) => {
    const input = todoItem.querySelector("input");
    input.addEventListener("click", (e) => {
      todos[index].done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      if (todos[index].done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
    });
  });
}

// EDIT TODOS
function editTodos() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem, index) => {
    const edit = todoItem.querySelector(".edit");
    const content = todoItem.querySelector(".todo-content");
    const input = content.querySelector("input");
    edit.addEventListener("click", (e) => {
      input.removeAttribute("readonly");
      input.focus();
      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todos[index].content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));

        // DisplayTodos();
      });
    });
  });
}

// DELETE TODOS
function deleteTodos() {
  const todoItems = document.querySelectorAll(".todo-item");
  todoItems.forEach((todoItem, index) => {
    const deleteButton = todoItem.querySelector(".delete");
    deleteButton.addEventListener("click", (e) => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
    // DisplayTodos();
}
