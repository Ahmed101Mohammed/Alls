// models:
const path = require('path');
const UserSchema = require(path.join(__dirname,'..','model','User.js'));

// object:
const database = {
    isTheUserNameDublicated: async(userName)=>{
        let isItExist = await UserSchema.findOne(userName).then(user=>{

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

    },

    isThePasswordOfTheUserNameIsARight: async(password, userName)=>
    {
        let passwordFromDB = await UserSchema.findOne(userName).then(user => {
            return user.password;
        });

        try
        {

        }
        catch(e)
        {

        }
    },

    
}

// exports:
module.exports = database;