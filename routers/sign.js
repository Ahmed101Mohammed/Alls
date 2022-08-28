// modules
const router = require('express').Router();
const path = require('path');

// routes
router.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','sign.html'))
    })

module.exports = router;