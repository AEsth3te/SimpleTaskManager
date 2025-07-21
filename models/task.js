// models/task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Task = sequelize.define('task', {
  idtask: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskDesc: {
    type: DataTypes.TEXT
  },
  isTaskCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
  tableName: 'task' // Назва таблиці в БД
});

module.exports = Task;
