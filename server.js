const express = require('express');
const path = require('path');
const sequelize = require('./config/db');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/tasksRouter');

const app = express();
const port = 2000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);   // /api/users/login
app.use('/api/tasks', taskRouter);   // /api/tasks/task

app.get('/', (req, res) => {
  res.redirect('/login.html');
});

sequelize.authenticate()
  .then(() => {
    console.log('DB connected');
    app.listen(port, () => {
      console.log(`Server started on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('DB error:', err);
  });
