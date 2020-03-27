const Sequalize = require('sequelize');
const {sequelize, Op} = require('./../db/sequelize');
const {Stream} = require('./../model/stream.js');
const {Year} = require('./../model/year.js');

const Stream_year = sequelize.define('Steam_year',{});

Stream.belongsToMany(Year,{through: Stream_year,foreignKey:'streamId'});
Year.belongsToMany(Stream,{through: Stream_year,foreignKey:'yearId'});

module.exports = {Stream_year};

