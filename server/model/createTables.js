const {Student} = require('./../model/student.js');

module.exports =
    async function createTables() {
        await Student.sync();
    }