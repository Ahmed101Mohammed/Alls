// modules:
const path = require('path');
const Register = require(path.join(__dirname,'..','objects','register'));
const User = require(path.join(__dirname,'..','model','User.js'));

// post new user data function:
const createNewAccount = async(req,res)=>{
    const {userName,email,password} = req.body;
    
    let isACorrectInputs = await Register.isACorrectInputs({userName,email,password});
    if(Register.notEqualTrueString(isACorrectInputs)) return res.json(isACorrectInputs);

    let hashedPassword = await Register.hashPasswordErrorHandler(password);
    if(!hashedPassword) return res.status(500).json({"serverError" : "Something wrong with hashing password process"});

    let user = new User({
        userName,
        email,
        password:hashedPassword,
    });

    let successStatusMessage = await Register.addUserRigisterDataToTheDataBaseErrorHandeler(user);
    return res.status(successStatusMessage.status).json(successStatusMessage.message);
}

// exports
module.exports = {createNewAccount};