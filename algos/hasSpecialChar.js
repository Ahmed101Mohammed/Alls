// The algorithm that built here: take a string and determine if the string has a special char or not:

// modules:
const path = require('path');
const specialCharchterHahs = require(path.join(__dirname,'..','classes','HashMapForSpecialChars.js'));

// oneAtLeast function:
const oneAtLestSpecialChar = (password)=>{
    let mySpechialHash = new specialCharchterHahs();
    mySpechialHash.specialCharsWanted();

    for(let i of password)
    {
        if(mySpechialHash.get(i))
        {
            return true;
        }
    }
    return false;
}

// export:
module.exports = oneAtLestSpecialChar;