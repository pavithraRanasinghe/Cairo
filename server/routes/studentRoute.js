const express = require('express');
const router = express.Router();
const {sequelize, Op} = require('./../db/sequelize.js');

const {Student} = require('./../model/student.js');
const {Guardian} = require('./../model/guardian.js');
const {Stream} = require('./../model/stream.js');
const {Subject} = require('./../model/subject.js');
const {Year} = require('./../model/year.js');
const {Stream_subject} = require('./../model/streamSubject.js');
const {Stream_year} = require('./../model/streamYear');

/**
 * Content-type : application/json
 * @property "name"
 * @property "address"
 * @property "contact"
 * @property "nic"
 * @property "gender"
 * @property "guardianName"
 * @property "guardianContact"
 * @property "guardianNic"
 * @property "streamName"
 * @property "subject1"
 * @property "subject2"
 * @property "subject3"
 * @property "year"
 *
 */

router.post('/addStudent', async (req, res) => {
    try {
        const transactionResult = sequelize.transaction({autocommit: false}, async (t) => { // start transaction
            console.log("request - addStudent | payload : {}", req.body);
            var guardianResult = await Guardian.findOne({
                where: {
                    guardianName: req.body.guardianName,
                    guardianContact: req.body.guardianContact,
                    guardianNic: req.body.guardianNic
                }
            });
            if (guardianResult) {
                console.log("Guardian is already saved");
            } else {
                let guardian = {
                    guardianName: req.body.guardianName,
                    guardianContact: req.body.guardianContact,
                    guardianNic: req.body.guardianNic
                };
                var guardianResult = await Guardian.create(guardian, {transaction: t});
                console.log("Guardian saved");
            }
            console.log(guardianResult.dataValues);
            try {
                let streamResult = await Stream.findOne({
                    where: {
                        streamId: req.body.streamId
                    }
                });
                if (streamResult) {
                    console.log("Stream already saved");
                    let student = {
                        name: req.body.name,
                        address: req.body.address,
                        contact: req.body.contact,
                        nic: req.body.nic,
                        gender: req.body.gender,
                        guardianId: guardianResult.dataValues.guardianId,
                        streamId: streamResult.streamId
                    };
                    try {
                        const addStudent = await Student.create(student, {transaction: t});
                        if (addStudent) { // if student added
                            console.log("Student saved");
                            try {

                                let subjectObj = {
                                    1: req.body.subject1,
                                    2: req.body.subject2,
                                    3: req.body.subject3,
                                };
                                const subjects = Object.values(subjectObj);

                                for (let subject of subjects) {
                                    console.log("Subject : ", subject);
                                    let subjectStream = await Stream_subject.findOne({
                                        where: {
                                            streamId: streamResult.streamId,
                                            subjectId: subject
                                        }
                                    });
                                    console.log("Subject Stream : ", subjectStream);
                                    if (subjectStream) {
                                        console.log("Subject already added");
                                    } else {
                                        await Stream_subject.create({
                                            streamId: streamResult.streamId,
                                            subjectId: subject
                                        });
                                    }
                                }

                                let yearResult = await Year.findOne({
                                    where: {
                                        year: req.body.year
                                    }
                                });
                                if (yearResult) {
                                    let streamYearResult = await Stream_year.findOne({
                                        where: {
                                            yearId: yearResult.yearId,
                                            streamId: streamResult.streamId
                                        }
                                    });
                                    if (streamYearResult) {
                                        console.log("Already added");
                                    } else {
                                        await Stream_year.create({
                                            streamId: streamResult.streamId,
                                            yearId: yearResult.yearId
                                        }, {transaction: t});
                                    }
                                }else{
                                    console.log("Year not added");
                                }

                            } catch (e) { // error occurred while add subject
                                console.log("Error : {}", e);
                            }
                            ;
                        } else { // if guardian not added
                            console.log("Something went wrong while add guardain");
                        }
                        ;
                    } catch (e) { // error occurred while add guardian
                        console.log("Error : {}", e);
                    }
                    ;
                } else {
                    return;
                }
            } catch (e) {// error occurred while add stream
                console.log("Error : {}", e);
            }
            ;
        }).finally(); // end transaction
    } catch (e) {
        res.send("Error > " + e.message);
        console.log(e);
    }
});

router.get('/getStudent', async (req, res) => {
    try {
        console.log("Student ID : {}", req.body.id);
        let studentDetail = await Student.findOne({
            include: [{
                model: Guardian,
            }],
            through: {
                where: {student_Id: req.body.id}
            }
        });
        console.log("Student Details : {}", studentDetail);
        if (studentDetail) { // if student details fetched
            // console.log("Student details",studentDetail);
            console.log("Student details fetched");
            // try {
            //     console.log("Guardian fetch")
            //     let guardianDetail = await Guardian.findOne({where: studentDetail.guardianId});
            //     console.log("Guardian details fetched");
            //     if (guardianDetail) { // if guardian details fetched
            //         try {
            //
            //         } catch (e) { // error occurred while fetch stream data
            //             console.log("Error : {}", e);
            //         }
            //     }
            // } catch (e) { // error occurred while fetch guardian details
            //     console.log("Error : {}", e)
            // }
        }
        // res.send(JSON.stringify(studentDetail.dataValues));
        res.send("SEND");
    } catch (e) { // error occurred while fetch student details
        console.log("Error > ", e);
    }
});

module.exports = router;