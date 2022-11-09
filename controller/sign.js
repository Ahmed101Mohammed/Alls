let path = require('path');
let databaseObject = require(path.join(__dirname, '..', 'objects', 'database.js'));

const signToMyAccount = (req, res)=>
{
    const {userName, password} = req.body;

    if(!databaseObject.isTheUserNameDublicated({userName})) return res.json({'userNameError': 'The user name is not registered before'})


    
}