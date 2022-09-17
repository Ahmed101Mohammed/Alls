// modules:
const path = require('path');
//const hasSpecielChar = require(path.join(__dirname,'..','algos','hasSpecialChar'));
const Register = require(path.join(__dirname,'..','algos','register'));
const User = require(path.join(__dirname,'..','model','User.js'));
const bcrypt = require('bcrypt');

// post new user data function:
const registerPostUserData = async(req,res)=>{
    const {userName,email,password} = req.body;
    console.log({userName,email,password})
    
    let isACorrectInputs = Register.isACorrectInputs({userName,email,password},res);
    console.log('all inputs is good')
    if(Register.notEqualTrueString(isACorrectInputs)) return;
    console.log('all inputs is good')
    await User.findOne({userName:userName}).then(user=>{
        console.log('u',user);
        if(user !== null && user.userName === userName)
        {
            return res.status(301).json({error: 'Sorry the userName was used before'})
        }
    });

    try{
        let hashedPpassword = await bcrypt.hash(password,10);

        let user = new User({
            _id: 1,
            userName: userName,
            email: email,
            password: hashedPpassword
        });

        let newUser = await user.save()

        console.log(newUser);

        return res.status(200).json({'successRegister': 'Now you have an account on ALLs website'})
    }
    catch(e)
    {
        return res.status(500).json({'fieldRegister': 'Server error the account field to creating, Try again'})
    }

}

// exports
module.exports = {registerPostUserData};