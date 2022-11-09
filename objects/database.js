// models:
const path = require('path');
const UserSchema = require(path.join(__dirname,'..','model','User.js'));
const bcrypt = require('bcrypt');

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

        return database.compareHashingPasswordWithNormalOne(passwordFromDB, password);   
    },

    compareHashingPasswordWithNormalOne: async(hashingPassword, normalPassword)=>
    {
        try
        {
            let areTheySimilar = bcrypt.compare(hashingPassword, normalPassword);
            return areTheySimilar;
        }
        catch(e)
        {
            return {"passwordError": "Failed to compare the enter password with the real password."};
        }
    }
}

// exports:
module.exports = database;