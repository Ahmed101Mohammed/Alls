// modules:
const mongoose = require('mongoose');
const env = require('dotenv').config();

// connecting with local DB:

mongoose.connect(`mongodb+srv://ahmed:${process.env.DATABASEPASS}@cluster0.axity4k.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log('Database is Connect...')
});

// export:
module.exports = mongoose;