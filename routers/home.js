// modules:
const router = require('express').Router();
const path = require('path');

// routes:
router.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'..','views','index.html'));
    });

// export module:
module.exports = router;