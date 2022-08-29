// modules:
const mongoose = require('mongoose');

// user schema:
const UserSchema = mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },

    userName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    refreshTocken:{
        type: string,
    },

    poducts:{
        type: Array,
    },
    
    cart:{
        type: Array,
    },
    sellingProcess:{
        type: Array,
    },

    selled:{
        type: Array,
    },

    channels:{
        type: Array,
    }
})