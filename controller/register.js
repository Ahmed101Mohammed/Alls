// modules:
const path = require('path');
const Register = require(path.join(__dirname,'..','objects','register'));
const User = require(path.join(__dirname,'..','model','User.js'));

// post new user data function:
const createNewAccount = async(req,res)=>{
    const {userName,email,password} = req.body;
    
    let isACorrectInputs = await Register.isACorrectInputs({userName,email,password});
    if(Register.notEqualTrueString(isACorrectInputs)) return res.json(isACorrectInputs);

    let hashedPassword = await Register.hashPasswordHandlingError(password);
    if(!hashedPassword) return res.status(500).json({"serverError" : "Something wrong with hashing password process"});

    // clean:
    try{
        let user = new User({
            userName,
            email,
            password:hashedPassword,
        });
        console.log({user})
        let newUser = await user.save()
        console.log(newUser)
        return res.status(200).json({'successRegister': 'Now you have an account on ALLs website'})
    }
    catch(e)
    {
        return res.status(500).json({'fieldRegister': 'Server error the account field to creating, Try again'})
    }

}

// exports
module.exports = {createNewAccount};