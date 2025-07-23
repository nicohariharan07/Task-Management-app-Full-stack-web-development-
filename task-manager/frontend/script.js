const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const API_URL = 'http://localhost:5000/api/tasks';

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration:${task.completed ? 'line-through' : 'none'}">${task.title}</span>
      <div>
        <button onclick="toggleComplete('${task._id}', ${task.completed})">✅</button>
        <button onclick="deleteTask('${task._id}')">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', async e => {
  e.preventDefault();
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: taskInput.value, completed: false })
  });
  taskInput.value = '';
  loadTasks();
});

async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();