const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next)=>
{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);

    let accessTocken = authHeader.split(' ')[1];
    jwt.verify(
        accessTocken,
        process.env.ACCESS_TOCKEN_SECRET,
        (error, decouded) =>
        {
            if(error) return res.sendStatus(403);
            req.userName = decouded.userName;
            next();
        }
    )

}

module.exports = verifyJWT;