const {Student} = require('./student.js');
const {Guardian} = require('./guardian.js');
const {Stream} = require('./stream.js');
const {Subject} = require('./subject.js');
const {Year} = require('./year.js');
const {Stream_subject} = require('./streamSubject.js');
const {Stream_year} = require('./streamYear.js')

module.exports =
    async function createTables() {
        await Guardian.sync();
        await Stream.sync();
        await Student.sync();
        await Subject.sync();
        await Year.sync();
        await Stream_subject.sync();
        await Stream_year.sync();
    }