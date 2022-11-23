let jwt = require('jsonwebtoken');

class authWithJWT
{
    constructor()
    {

    }

    createTocken = (data, tockenSecterData, expiratoryDateInString)=>{
        try
        {
            let tocken = jwt.sign(
                data,
                tockenSecterData,
                {expiresIn: expiratoryDateInString}
            );

            return tocken;
        }
        catch(_)
        {
            return false;
        }
        
        
    }
}

module.exports = authWithJWT;