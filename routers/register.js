// modules:
const router = require('express').Router();
const path = require('path');
const {createNewAccount} = require(path.join(__dirname,'..','controller','register.js'))
// register routers:
router.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname,"..","views","register.html"))
    })
    
    .post(createNewAccount);


// export:
module.exports = router;