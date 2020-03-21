const Sequelize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');

const Student = sequelize.define('Student', {
    student_Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    contact: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,

    },
    nic: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    guardianName: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
    },
    guardianContact: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        required: true
    },
    guardianNic: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    subject1: {
        type: Sequelize.STRING,
    },
    subject2: {
        type: Sequelize.STRING,
    },
    subject3: {
        type: Sequelize.STRING,
    },
});

module.exports = {Student};

