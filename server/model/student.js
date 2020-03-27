const Sequelize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');
const {Guardian} = require('./../model/guardian.js');
const {Stream} = require('./../model/stream.js');

const Student = sequelize.define('Student', {
    student_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    contact: {
        type: Sequelize.STRING
    },
    nic: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    }
});

Student.belongsTo(Guardian, {
    foreignKey: 'guardianId',
    targetKey: 'guardianId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Student.belongsTo(Stream, {foreignKey: 'streamId', targetKey: 'streamId', onDelete: 'CASCADE', onUpdate: 'CASCADE'});

module.exports = {Student};

