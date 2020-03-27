const express = require('express');
const router = express.Router();

const {Year} = require('./../model/year.js');

/**
 * Add year
 *
 *Content-type : application/json
 * @property year
 *
 */
router.post('/addYear', async (req, res) => {
    try {
        const yearResult = await Year.findOne({
            where: {
                year: req.body.year
            }
        });
        if (yearResult) {
            console.log("Year already added");
        } else {
            try {
                const addYear = await Year.create({year: req.body.year});
                if (addYear) {
                    console.log("Year saved");
                    res.send("Year saved");
                }
            } catch (e) { // error occurred while add year
                console.log("Error : {}", e);
            }
        }
    } catch (e) { // error occurred while find years
        console.log("Error : {}", e);
    }
});

/**
 *  Fetch all subjects
 *
 */

router.get('/getYears',async (req,res)=>{
    const years = await Year.findAll();
    if (years) {
        res.send(JSON.stringify(years));
    }else {
        console.log("Something went wrong");
    }
});

/**
 *
 * @property yearId
 */

router.delete('/deleteYear',async (req,res)=>{
    const checkYear = await Year.findOne({
        where:{
            yearId: req.body.yearId
        }
    });
    if (checkYear) {
        const deleteYear = await Year.destroy({
            where:{
                yearId: req.body.yearId
            }
        });
        if (deleteYear) {
            res.send("Year deleted");
        }else {
            console.log("Something went wrong");
        }
    }else {
        console.log("Year not found");
    }
});

module.exports = router;