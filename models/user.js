const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('login', {
    log_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    log_surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log_firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log_othernames: {
        type: Sequelize.STRING,
        allowNull: true
    },
    log_username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log_password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log_programmeid: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phoneno: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = User;