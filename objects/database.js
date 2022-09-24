// models:
const path = require('path');
const UserSchema = require(path.join(__dirname,'..','model','User.js'));

// object:
const database = {
    isTheUserNameDublicated: async(registerUserNameData)=>{
        let isItExist = await UserSchema.findOne(registerUserNameData).then(user=>{

            if(user !== null)
            {
                return true
            }
        });

        if(isItExist) return true;

        return false;
    },

    isTheUserEmailDublicated: async(registerUserEmailData)=>{
        let isItExist = await UserSchema.findOne(registerUserEmailData).then(user => {
            if(user !== null)
            {
                return true;
            }
        });

        if(isItExist) return true;

        return false;

    }
}

// exports:
module.exports = database;