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

    notEqualTrueString: (variable)=>{
        if(variable !== "true") return true;
        return false;
    },

    isEmpty: (string,errorType)=>{
        if(string.length === Register.lengths.empityContnet)
        {
            let message;
            switch(errorType){
                case 'userName':
                    message =  {'userNameError': "User name is required"};
                    break;
                case 'password':
                    message =  {'passwordError': "The password is required"};
                    break;
                case 'email':
                    message =  {'emailError': "Email is required"};
                    break;

            }
            return message;
        }
        return "true"
    },

    userNameCheckMethods:{
        isARightTall: (userName)=>{
            if(!(userName.length >= Register.lengths.minUsername))
            {
                return {'userNameError': `User name should be longer than 6 chars`};
            }

            return 'true';

        },

        isARightInput: (userName)=>{
            let space = Register.lettersRelatedToRegister.space;

            if(Search.searchAboutLetterInString(userName,space))
            {
                return {'userNameError': `User name should not containe spaces`};
            }

            return 'true';
        }
    },

    emailCheckMethods:{

        isARightInput: (email)=>{
            let space = Register.lettersRelatedToRegister.space;
            let atSign = Register.lettersRelatedToRegister.atSign;

            if(Search.searchAboutLetterInString(email,space) || !Search.searchAboutLetterInString(email,atSign))
            {
                return {'emailError':`Write a correct email, please`};
            }

            return 'true';
        }
    },

    passwordCheckMethods:{
        isARightTall: (password)=>{

            if(!(password.length >= Register.lengths.minPassword))
            {
                return {'passwordError': `The password should be longer than 8 chars`};
            }

            return 'true';
            
        },

        isARightInput: (password)=>{

            let unWantedChars = Register.lettersRelatedToRegister.unAccetableChars;
            if(Search.searchAboutLetterInString(password,unWantedChars))
            {
                return {'passwordError':`Your password shuld not contain spaces or one of this letters (\`'"/|,<>~)`};
            }

            let wantedChars = Register.lettersRelatedToRegister.acceptableChars;
            if(!Search.searchAboutLetterInString(password,wantedChars))
            {
                return {'passwordError':`Your password should contain one of this letters (!@#$%^&*(){}[]?:;_-) in minemum`};
            }

            return 'true';
        }
    },

    isACrorrectUserName: (userName)=>{
        let isEmpty = Register.isEmpty(userName,'userName');
        if(Register.notEqualTrueString(isEmpty)) return isEmpty;

        let rightTall = Register.userNameCheckMethods.isARightTall(userName);
        if(Register.notEqualTrueString(rightTall)) return rightTall;

        let rightInput = Register.userNameCheckMethods.isARightInput(userName)
        if(Register.notEqualTrueString(rightInput)) return rightInput;

        return 'true';
    },

    isACorrectEmail: (email)=>{
        let isEmpty = Register.isEmpty(email,'email');
        if(Register.notEqualTrueString(isEmpty)) return isEmpty;

        let rightInput = Register.emailCheckMethods.isARightInput(email)
        if(Register.notEqualTrueString(rightInput)) return rightInput;

        return 'true';
  
    },

    isACorrectPassword: (password,)=>{

        let isEmpty = Register.isEmpty(password,'password');
        if(Register.notEqualTrueString(isEmpty)) return isEmpty;

        let rightTall = Register.passwordCheckMethods.isARightTall(password);
        if(Register.notEqualTrueString(rightTall)) return rightTall;

        let rightInput = Register.passwordCheckMethods.isARightInput(password)
        if(Register.notEqualTrueString(rightInput)) return rightInput;

        return 'true';
    },

    isACorrectInputs: ({userName,password,email})=>{

        let userNameAcceptable = Register.isACrorrectUserName(userName);
        if(Register.notEqualTrueString(userNameAcceptable)) return userNameAcceptable;

        let passwordAcceptable = Register.isACorrectPassword(password);
        if(Register.notEqualTrueString(passwordAcceptable)) return passwordAcceptable;

        let emailAcceptable = Register.isACorrectEmail(email);
        if(Register.notEqualTrueString(emailAcceptable)) return emailAcceptable;

        return "true";
    }

}

// export:
module.exports = Register;