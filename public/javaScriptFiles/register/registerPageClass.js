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


    async sendUserRegisterDataToTheServer()
    {
        let userRegisterData = RegisterForm.sendUserRegisterDataToTheServer.prapereTheUserRegisterData();
        let response = await RegisterForm.postUserDataInRegisterRoute.mainMethod(userRegisterData);
        RegisterForm.sendUserRegisterDataToTheServer.appearErrorMessageAccordingErrorType.mainMethod(response);
    }
}

let myRegisterPage = new RegisterPage();
