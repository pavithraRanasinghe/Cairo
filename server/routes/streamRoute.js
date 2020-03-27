const express = require('express');
const router = express.Router();

const {Stream} = require('./../model/stream.js');

/**
 * Add stream
 *
 *Content-type : application/json
 * @property stream
 *
 */
router.post('/addStream', async (req, res) => {
    try {
        const streamResult = await Stream.findOne({
            where: {
                streamName: req.body.stream
            }
        });
        if (streamResult) {
            console.log("Stream already added");
        } else {
            try {
                const addStream = await Stream.create({streamName: req.body.stream});
                if (addStream) {
                    console.log("Stream saved");
                    res.send("Stream saved");
                }
            } catch (e) { // error occurred while add steam
                console.log("Error : {}", e);
            }
        }
    } catch (e) { // error occurred while find stream
        console.log("Error : {}", e);
    }
});

/**
 *  Fetch all streams
 *
 */

router.get('/getStreams',async (req,res)=>{
    const stream = await Stream.findAll();
    if (stream) {
        res.send(JSON.stringify(stream));
    }else {
        console.log("Something went wrong");
    }
});

/**
 *
 * @property streamId
 */

router.delete('/deleteStream',async (req,res)=>{
    const checkStream = await Stream.findOne({
        where:{
            streamId: req.body.streamId
        }
    });
    if (checkStream) {
        const deleteStream = await Stream.destroy({
            where:{
                streamId: req.body.streamId
            }
        });
        if (deleteStream) {
            res.send("Stream deleted");
        }else {
            console.log("Something went wrong");
        }
    }else {
        console.log("Stream not found");
    }
});


module.exports = router;