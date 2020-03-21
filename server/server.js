/**
 *
 *requiring libraries
 * @type {createApplication}
 */
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const port = config.port;

/**
 * create tables
 */

const createTable = require('./model/createTables.js');
createTable();

/**
 * User routes
 */

app.use('/', require('./routes/student.js'));

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



