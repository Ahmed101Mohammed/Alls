// modules:
const mongoose = require('mongoose');
const env = require('dotenv').config();

// connecting with local DB:

mongoose.createConnection(`mongodb+srv://ahmed:ahmed444@cluster0.axity4k.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log('Database is Connect...')
});

// export:
module.exports = mongoose;