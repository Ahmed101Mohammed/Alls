class RegisterPage
{
    constructor()
    {
        this.registerButton = document.querySelector('fieldset.register div.register');
    }



    get userNameValue()
    {
        return document.querySelector('#user-name').value;
    }

    get emailValue()
    {
        return document.querySelector('#email').value;
    }

    get passwordValue()
    {
        return document.querySelector('#pssw').value;
    }


    async handlingErrorOfTurnTheRespondToJsonFunctionality(theResponse)
    {
        let theResponseInJson;
        try{
            const responseMessage = await theResponse.json();
            theResponseInJson = responseMessage;
        }
        catch(e)
        {
            theResponseInJson = {"readingResponseError":"Field to read the response"};
        }
        return theResponseInJson;
    }

    async postUserDataInRegisterRoute(userRegisterData)
    {
        const response = await fetch('/register',{
            method:'POST',
            credentials:'same-origin',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(userRegisterData),
        })

        let theResponseInJsonStructure = await this.handlingErrorOfTurnTheRespondToJsonFunctionality(response);
        return theResponseInJsonStructure;
    }


    getFieldsetThatCausedTheError(errorMessage)
    {
        let theFieldsetThatCausedTheError;

        if("userNameError" in errorMessage)
        {
            theFieldsetThatCausedTheError = documet.querySelector('fieldset.user-name');
            
        }
        else if("passwordError" in errorMessage)
        {
            theFieldsetThatCausedTheError = documet.querySelector('fieldset.email');
        }
        else if("emailError" in errorMessage)
        {
            theFieldsetThatCausedTheError = documet.querySelector('fieldset.pssw');
        }

        return theFieldsetThatCausedTheError;
    }

    cteateErrorElement(errorMessage)
    {
        let errorElement = document.createElement("div");
        errorElement.classList.add("errorMessageFirstApearance");
        let errorMessageProperity = Object.getOwnPropertyNames(errorMessage);
        let errorMessageString = errorMessage[errorMessageProperity[0]];
        errorElement.textContent = errorMessageString;

        return errorElement;
    }

    get lastErrorMessageElement()
    {
        return document.querySelector("form .errorMessageSecondApearance");
    }

    #appearErrorMessageAccordingErrorType()
    {
        let lastErrorElement = this.lastErrorMessageElement();
        if(lastErrorElement) lastErrorElement.remove();

        let errorElement = this.cteateErrorElement(errorMessage);
                
        let theParentElementOfErrorElement = this.getFieldsetThatCausedTheError(errorMessage);
        if(!theParentElementOfErrorElement) return;

        this.addTheErrorElementToTheFieldset(errorElement,theParentElementOfErrorElement);
    }

    prapereTheUserRegisterData()
    {
        const userNameValue = this.userNameValue();
        const emailValue = this.emailValue();
        const passwordValue = this.passwordValue();
        
        const userRegisterData = {
            userName: userNameValue,
            email: emailValue,
            password: passwordValue
        };

        return userRegisterData;
    }

    async sendUserRegisterDataToTheServer()
    {
        let userRegisterData = this.prapereTheUserRegisterData();
        let response = await this.postUserDataInRegisterRoute(userRegisterData);
        this.#appearErrorMessageAccordingErrorType(response);
    }
}

let myRegisterPage = new RegisterPage();
