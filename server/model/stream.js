const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');

const Stream = sequelize.define('Stream',{
    streamId : {
        type: Sequalize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    streamName: {
        type: Sequalize.STRING,
        allowNull: false,
        required: true
    }
});

module.exports ={Stream};