const Sequelize = require('sequelize');

const sequelize = new Sequelize('cairo', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    autocommit:false,
    autoClose:true,
    autoReconnect: true,
    autoIncrement: true,
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
});

const Op = Sequelize.Op;

module.exports = {sequelize, Op};