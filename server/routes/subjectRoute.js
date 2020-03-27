const express = require('express');
const router = express.Router();

const {Subject} = require('./../model/subject.js');

/**
 * Add subject
 *
 *Content-type : application/json
 * @property subjectName
 *
 */
router.post('/addSubject', async (req, res) => {
    try {
        const subjectResult = await Subject.findOne({
            where: {
                subjectName: req.body.subjectName
            }
        });
        if (subjectResult) {
            console.log("Subject already added");
        } else {
            try {
                const addSubject = await Subject.create({subjectName: req.body.subjectName});
                if (addSubject) {
                    console.log("Subject saved");
                    res.send("Subject saved");
                }
            } catch (e) { // error occurred while add subject
                console.log("Error : {}", e);
            }
        }
    } catch (e) { // error occurred while find subjects
        console.log("Error : {}", e);
    }
});

/**
 *  Fetch all subjects
 *
 */

router.get('/getSubjects',async (req,res)=>{
   const subjects = await Subject.findAll();
   if (subjects) {
       res.send(JSON.stringify(subjects));
   }else {
       console.log("Something went wrong");
   }
});

/**
 *
 * @property subjectId
 */

router.delete('/deleteSubject',async (req,res)=>{
    const checkSubject = await Subject.findOne({
        where:{
            subjectId: req.body.subjectId
        }
    });
    if (checkSubject) {
        const deleteSubject = await Subject.destroy({
            where:{
                subjectId: req.body.subjectId
            }
        });
        if (deleteSubject) {
            res.send("Subject deleted");
        }else {
            console.log("Something went wrong");
        }
    }else {
        console.log("Subject not found");
    }
});
module.exports = router;