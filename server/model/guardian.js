const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize.js');

const Guardian = sequelize.define('Guardian', {
    guardianId: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    guardianName: {
        type: Sequalize.STRING
    },
    guardianContact: {
        type: Sequalize.STRING
    },
    guardianNic: {
        type: Sequalize.STRING
    },
});


module.exports = {Guardian};