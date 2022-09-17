// modules:
const mongoose = require('mongoose');

// user schema:
const UserSchema = mongoose.Schema({
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
        type: String,
    },

    verified:{
        type: Boolean,
        default: false,
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

// export:
module.exports = mongoose.model('User',UserSchema);