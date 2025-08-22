let todoList = [];

function validateForm() {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("date-input");

  if (!taskInput.value.trim()) {
    alert("Please enter a task.");
    return false;
  }
  if (!dueDateInput.value) {
    alert("Please select a due date.");
    return false;
  }

  addTodo(taskInput.value.trim(), dueDateInput.value);

  // Clear fields
  taskInput.value = "";
  dueDateInput.value = "";
}

function addTodo(task, dueDate) {
  todoList.push({
    task: task,
    dueDate: dueDate,
    done: false
  });
  renderTodoList();
}

function renderTodoList(list = todoList) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = '';

  if (list.length === 0) {
    taskList.innerHTML = `
      <tr>
        <td colspan="4" class="text-center text-gray-500 italic py-4">
          No tasks found
        </td>
      </tr>`;
    return;
  }

  for (let i = 0; i < list.length; i++) {
  const realIndex = todoList.indexOf(list[i]);

  taskList.innerHTML += `
    <tr class="border-b">
      <td class="py-2 px-4 text-left ${list[i].done ? 'line-through text-gray-500' : ''}">
        ${list[i].task}
      </td>
      <td class="py-2 px-4 text-left ${list[i].done ? 'line-through text-gray-500' : ''}">
        ${list[i].dueDate}
      </td>
      <td class="py-2 px-4 text-center">
        <input 
            type="checkbox" 
            ${list[i].done ? "checked" : ""} 
            onchange="toggleTaskStatus(${realIndex})"
        />
        </td>
        <td class="py-2 px-4 text-center">
        <button 
            onclick="deleteTask(${realIndex})" 
            class="text-red-500 hover:text-red-700"
        >
            X
        </button>
      </td>
    </tr>`;
}
}

function toggleTaskStatus(index) {
  if (index < 0 || index >= todoList.length) return;
  todoList[index].done = !todoList[index].done;
  renderTodoList();
}

// Deleting All To Do List
function deleteAll() {
  todoList = [];
  renderTodoList();
}

// Deleting To Do List
function deleteTask(index) {
  if (index < 0 || index >= todoList.length) return;
  todoList.splice(index, 1);
  renderTodoList();
}

function filterTasks(filter) {
  let filtered = [];

  if (filter === 'all') {
    filtered = todoList;
  } else if (filter === 'active') {
    filtered = todoList.filter(t => !t.done);
  } else if (filter === 'completed') {
    filtered = todoList.filter(t => t.done);
  }

  renderTodoList(filtered);
}