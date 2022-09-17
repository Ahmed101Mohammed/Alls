// models:
const path = require('path');
const User = require(path.join(__dirname,'..','model','User.js'));

// object:
const database = {
    isTheUserNameDublicated: async(registerUserNameData)=>{
        let isItExist = await User.findOne(registerUserNameData).then(user=>{

            if(user !== null)
            {
                return true
            }
        });

        if(isItExist) return true;

        return false;
    }
}

// exports:
module.exports = database;