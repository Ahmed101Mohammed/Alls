// modules
const router = require('express').Router();
const path = require('path');
const signToMyAccount = require(path.join(__dirname, '..', 'controller', 'sign.js'));

// routes
router.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','sign.html'))
    })
    .post(signToMyAccount);

module.exports = router;