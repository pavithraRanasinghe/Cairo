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

app.use('/', require('./routes/studentRoute.js'));
app.use('/', require('./routes/subjectRoute.js'));
app.use('/', require('./routes/streamRoute.js'));
app.use('/', require('./routes/yearRoute.js'));



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});



