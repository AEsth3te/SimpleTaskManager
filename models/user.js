const DataTypes = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false
    }}, {
        timestamps: false,
        tableName: 'user'
    });

module.exports = User;