// modules neede:
let databaseObject = require(path.join(__dirname, '..', 'objects', 'database.js'));

const refreshTocken = (req, res)=>
{
    const cookies = req.cookies;
    console.log({cookies}); // test

    if(!(cookies?.jwt)) return res.status(401).json({"CookieError": "JWT cookie is not founded"});

    const refreshTocken = cookies.jwt;
    




}