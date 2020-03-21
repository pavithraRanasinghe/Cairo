/**
 *
 *requiring libraries
 * @type {createApplication}
 */
const express = require('express');
const config = require('./config/config.js');
const port = config.port;

const app = express();

/**
 * create tables
 */
const createTable = require('./model/createTables.js');
createTable();

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});