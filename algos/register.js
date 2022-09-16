// Modules:
const path = require('path');
const Search = require(path.join(__dirname,'search'));

// Register Object:
const Register = {
    isACorrectEmail: (email)=>{
        const space = " ";
        const atSign = "@";

        if(Search.searchAboutLetterInString(email,space) || !Search.searchAboutLetterInString(email,atSign))
        {
            return false;
        }

        return true;        
    },
    
}

// export:
module.exports = Register;