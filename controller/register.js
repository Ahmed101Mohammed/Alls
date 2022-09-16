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
    
    Register.isACorrectInputs({userName,email,password},res);

}

// exports
module.exports = {registerPostUserData};