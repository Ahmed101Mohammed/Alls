// Modules:
const path = require('path');
const Search = require(path.join(__dirname,'search'));

// Register Object:
const Register = {

    lengths:{
        empityContnet:0,
        minUsername: 7,
        minPassword: 9
    },
    
    
    lettersRelatedToRegister:{
        acceptableChars:"!@#$%^&*(){}[]?:;_-",
        unAccetableChars:`\\\`'"/| ,<>~`,
        space: ' ',
        atSign: '@',
    },

    isEmpty: (string)=>{
        if(string.length === Register.lengths.empityContnet)
        {
            return true;
        }
        return false;
    },

    userNameCheckMethods:{
        isARightTall: (userName,response)=>{

            if(Register.isEmpty(userName))
            {
                return response.json({'userNameError': "User name is required"});
            }

            if(!(userName.length >= Register.lengths.minUsername))
            {
                return response.json({'userNameError': `User name should be longer than 6 chars`});
            }

            return 'true';

        },

        isARightInput: (userName,response)=>{
            let space = Register.lettersRelatedToRegister.space;

            if(Search.searchAboutLetterInString(userName,space))
            {
                return response.json({'userNameError': `User name should not containe spaces`});
            }

            return 'true';
        }
    },

    emailCheckMethods:{
        isARightTall: (email,response)=>{

            if(Register.isEmpty(email))
            {
                return response.json({'emailError': "The email is required"});
            }

            return 'true';
        },

        isARightInput: (email,response)=>{
            let space = Register.lettersRelatedToRegister.space;
            let atSign = Register.lettersRelatedToRegister.atSign;

            if(Search.searchAboutLetterInString(email,space) || !Search.searchAboutLetterInString(email,atSign))
            {
                return response.json({'emailError':`Write a correct email, please`});
            }

            return 'true';
        }
    },

    isACrorrectUserName: (userName,response)=>{
    
        let rightTall = Register.userNameCheckMethods.isARightTall(userName,response);
        if(rightTall !== 'true')
        {
            return;
        }

        let rightInput = Register.userNameCheckMethods.isARightInput(userName,response)
        if(rightInput !== 'true')
        {
            return;
        }

        return 'true';
    },

    isACorrectEmail: (email,response)=>{

        let rightTall = Register.emailCheckMethods.isARightTall(email,response);
        if(rightTall !== 'true')
        {
            return;
        }

        let rightInput = Register.emailCheckMethods.isARightInput(email,response)
        if(rightInput !== 'true')
        {
            return;
        }

        return 'true';
  
    },

    isACorrectPassword: (password, response)=>{

        if(Register.isEmpty(password))
        {
            return response.json({'passwordError':`Password is required`})
        }

        if(!(password.length >= Register.lengths.minPassword))
        {
            return response.json({'passwordError':`Password length shold contein more than 8 letters`})
        }

        let unWantedChars = Register.lettersRelatedToRegister.unAccetableChars;
        if(Search.searchAboutLetterInString(password,unWantedChars))
        {
            return response.json({'passwordError':`Your password shuld not contain spaces or one of this letters (\`'"/|,<>~)`});
        }

        let wantedChars = Register.lettersRelatedToRegister.acceptableChars;
        if(!Search.searchAboutLetterInString(password,wantedChars))
        {
            return response.json({'passwordError':`Your password should contain one of this letters (!@#$%^&*(){}[]?:;_-) in minemum`})
        }

        return 'true';

    },

    isACorrectInputs: ({userName,password,email},response)=>{

        let userNameAcceptable = Register.isACrorrectUserName(userName,response);

        if(userNameAcceptable !== 'true')
        {
            return;
        }

        let passwordAcceptable = Register.isACorrectPassword(password,response);

        if(passwordAcceptable !== 'true')
        {
            return;
        }

        Register.isACorrectEmail(email,response);
    }

}

// export:
module.exports = Register;