const Sequelize = require('sequelize');
const db = require('../utils/database');

const Task = db.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    priority: Sequelize.BOOLEAN,
    daily: Sequelize.BOOLEAN,
    completed: Sequelize.BOOLEAN
});

module.exports = Task;