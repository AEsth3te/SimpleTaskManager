const express = require('express');
const path = require('path');
const sequelize = require('./config/db');
const taskRouter = require('./routes/tasksRouter');

const app = express();

// 1️⃣ Публічні файли
app.use(express.static(path.join(__dirname, 'public')));

// 2️⃣ JSON парсер
app.use(express.json());

// 3️⃣ API
app.use('/tasks', taskRouter);

// 4️⃣ Головна сторінка (НЕ ОБОВ'ЯЗКОВО, якщо є index.html в public)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5️⃣ Запуск сервера
sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    app.listen(2002, () => {
      console.log('Server started on http://localhost:2002');
    });
  })
  .catch(err => {
    console.error('DB error:', err);
  });