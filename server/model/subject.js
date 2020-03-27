const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');

const Subject = sequelize.define("Subject",{
   subjectId: {
       type: Sequalize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true
   },
    subjectName: {
       type: Sequalize.STRING,
        allowNull: false,
        required: true
    }
});

module.exports = {Subject};