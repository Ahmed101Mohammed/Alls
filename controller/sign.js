let path = require('path');
let databaseObject = require(path.join(__dirname, '..', 'objects', 'database.js'));
let authWithJWT = require(path.join(__dirname, '..', 'classes', 'auth.js'));
let authClass = new authWithJWT();
require('dotenv').config();

const signToMyAccount = async(req, res)=>
{
    const {userName, password} = req.body;

    const isTheUserNameExist = await databaseObject.isTheUserNameDublicated({userName:userName});
    if(!isTheUserNameExist) return res.json({'userNameError': 'The user name is not registered before'})

    let dataIsRigt = await databaseObject.isThePasswordOfTheUserNameIsARight(password, {userName:userName});
    if(!dataIsRigt) 
    {
        return res.json({'passwordError': 'Wrong password, Try again...'})
    }
    else if(typeof(dataIsRigt) === Object)
    {
        return res.json(dataIsRigt);
    }

    try
    {
        const accessTocken = authClass.createTocken({userName},process.env.ACCESS_TOCKEN_SECRET, '30s');
        const refreshTocken = authClass.createTocken({userName},process.env.ACCESS_TOCKEN_SECRET, '5m');
        databaseObject.updateUserData(userName, 'refreshTocken', refreshTocken);
        return res.cookie('jwt', refreshTocken, {httpOnly: true, maxAge: 5 * 60 * 1000}).json({accessTocken});
    }
    catch(e)
    {
        return res.sendStatus(401);
    }    
}

module.exports = signToMyAccount;