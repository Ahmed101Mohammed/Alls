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
        console.log('hi') // test
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
            let areTheySimilar = bcrypt.compare(normalPassword, hashingPassword);
            return areTheySimilar;
        }
        catch(e)
        {
            return {"passwordError": "Failed to compare the enter password with the real password."};
        }
    },

    compareUserRefreshTockenWithOther: async(userName, refreshTocken)=>
    {
        let isTheUserRefreshTockenEqualTheOtherRefreshTocken = await UserSchema.findOne({userName}).then(user =>
            {
                if(user.refreshTocken === refreshTocken) return true;
                return false;
            });
        return isTheUserRefreshTockenEqualTheOtherRefreshTocken;
    },

    getUserData: async(userName) =>
    {
        let userData = await UserSchema.findOne(userName).then( user => {
            return user
        })

        return userData;
    },

    updateUserData: async(userName, dataWantToUpdate, value)=>{
        try
        {
            let userData = await databaseObject.getUserData({userName});
            userData[dataWantToUpdate] = value;
            userData.save();
        }
        catch(e)
        {
            return {'fieldUpdatingData': `Field to update ${dataWantToUpdate} of the user to ${value}`}
        }        

    }
}

// exports:
module.exports = database;