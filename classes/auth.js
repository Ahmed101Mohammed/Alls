let jwt = require('jsonwebtoken');

class authWithJWT
{
    createTocken = (data, tockenSecterData, expiratoryDate)=>{
        jwt.sign(
            data,
            tockenSecterData,
            {expiresIn: expiratoryDate}
        )
    }
}

module.exports = auth;