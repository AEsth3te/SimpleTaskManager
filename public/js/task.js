
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('taskForm');
  const taskNameInput = document.getElementById('taskName');
  const taskDescInput = document.getElementById('taskDesc');
  const taskTableBody = document.getElementById('taskTableBody');
  const token = localStorage.getItem('token'); // отримання токена після логіну

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskName = taskNameInput.value;
    const taskDesc = taskDescInput.value;

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        taskName,
        taskDesc,
        isTaskCompleted: false
      })
    });

    if (response.ok) {
      form.reset();
      loadTasks();
    }
  });

async function loadTasks() {
  const res = await fetch('/api/tasks', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    console.error('Не вдалося завантажити завдання:', res.status);
    return;
  }

  const tasks = await res.json();
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${task.idtask}</td>
    <td>${task.taskName}</td>
    <td>${task.taskDesc || '—'}</td>
    <td>${task.isTaskCompleted ? '✅' : '❌'}</td>
    <td>
      <button class="change-btn">Змінити</button>
      <button class="delete-btn">Видалити</button>
    </td>
  `;

  // Прив’язуємо обробники
  row.querySelector('.change-btn').addEventListener('click', () => {
    toggleComplete(task.idtask, !task.isTaskCompleted);
  });

  row.querySelector('.delete-btn').addEventListener('click', () => {
    deleteTask(task.idtask);
  });

  taskTableBody.appendChild(row);
});
  }

  async function toggleComplete(id, newStatus) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ isTaskCompleted: newStatus })
    });
    if (res.ok) loadTasks();
  }

  async function deleteTask(id) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    });
    if (res.ok) loadTasks();
  }

  loadTasks(); // завантаження при старті
});

document.getElementById("logout-btn").addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = '/login.html'; // Перенаправлення на логін
});
