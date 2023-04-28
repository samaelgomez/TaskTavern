const Sequelize = require('sequelize');
const db = require('../utils/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    avatar: Sequelize.STRING,
    level: Sequelize.INTEGER,
    weapon: Sequelize.STRING,
    armor: Sequelize.STRING,
    bag: Sequelize.ARRAY(Sequelize.STRING)
});

module.exports = User;