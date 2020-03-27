const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');
const {Stream} = require('./../model/stream.js');
const {Subject} = require('./../model/subject.js');

const Stream_subject = sequelize.define('Stream_subject',{

});

Stream.belongsToMany(Subject,{through: Stream_subject,foreignKey:'streamId'});
Subject.belongsToMany(Stream,{through: Stream_subject,foreignKey:'subjectId'});

module.exports = {Stream_subject};