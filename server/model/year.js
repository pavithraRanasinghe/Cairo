const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize.js');

const Year = sequelize.define('Year', {
    yearId: {
        type: Sequalize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    year: {
        type:Sequalize.INTEGER,
        allowNull: false,
        required: true
    }
});

module.exports = {Year};