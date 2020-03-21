const express = require('express');
const router = express.Router();
const {Student} = require('./../model/student.js');

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
 * @property "subject1"
 * @property "subject2"
 * @property "subject3"
 *
 */

router.post('/addStudent', async (req, res) => {
    try {
        console.log("request - addStudent | payload : {}", req.body);
        let student = {
            name: req.body.name,
            address: req.body.address,
            contact: req.body.contact,
            nic: req.body.nic,
            gender: req.body.gender,
            guardianName: req.body.guardianName,
            guardianContact: req.body.guardianContact,
            guardianNic: req.body.guardianNic,
            subject1: req.body.subject1,
            subject2: req.body.subject2,
            subject3: req.body.subject3
        };
        const addStudent = await Student.create(student);
        if (addStudent) {
            console.log("Student saved");
            res.send("Student added successful");
        } else {
            console.log("Something went wrong");
        }

    } catch (e) {
        res.send("Error > " + e.message);
        console.log(e.message);
    }
});

module.exports = router;