// modules:
const router = require('express').Router();
const path = require('path');

// register routers:
router.route('/')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname,"..","views","register.html"))
    });


// export:
module.exports = router;