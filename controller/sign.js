let path = require('path');
let databaseObject = require(path.join(__dirname, '..', 'objects', 'database.js'));
let jwt = require('jsonwebtoken');
require('dotenv').config();

const signToMyAccount = async(req, res)=>
{
    const {userName, password} = req.body;

    const isTheUserNameExist = await databaseObject.isTheUserNameDublicated({userName:userName});
    console.log(isTheUserNameExist);  // test
    if(!isTheUserNameExist) return res.json({'userNameError': 'The user name is not registered before'})

    let dataIsRigt = await databaseObject.isThePasswordOfTheUserNameIsARight(password, {userName:userName});
    if(!dataIsRigt) 
    {
        return res.json({'passwordError': 'Wrong password, Try again...'})
    }
    else if(typeof(dataIsRigt) === Object)
    {
        return dataIsRigt;
    }

    try
    {
        const accessTocken = jwt.sign(
            { userName: userName },
            process.env.ACCESS_TOCKEN_SECRET,
            {expiresIn: '30s'}
        )

    }
    catch(e)
    {}

    return res.json({'succesfulAuthintication' : 'Congrateulation You are in'})
    
}

module.exports = signToMyAccount;