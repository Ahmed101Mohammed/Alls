import FormErrorsRender from "../../library/Form-error-render.js";

function RegisterPage()
{
    this.registerButton = document.querySelector('fieldset.register div.register'),

    this.sendUserRegisterDataToTheServer = async () =>
    {
        let userRegisterData = this.prapereTheUserRegisterData();
        let response = await this.postUserDataInRegisterRoute(userRegisterData);
        this.getResponseMessageInString(response);

        let formErrorRenderOpject = new FormErrorsRender(response);
        formErrorRenderOpject.appearErrorMessageAccordingErrorType();

        this.appearSuccessfulOrFieledRigistringMessages(response);
    }

    this.prapereTheUserRegisterData = () =>
    {
        const userNameValue = this.getUserNameValue();
        const emailValue = this.getEmailValue();
        const passwordValue = this.getPasswordValue();
        
        const userRegisterData = {
            userName: userNameValue,
            email: emailValue,
            password: passwordValue
        };

        return userRegisterData;
    }

    this.getUserNameValue = ()=>
    {
        return document.querySelector('#user-name').value;
    }

    this.getEmailValue = ()=>
    {
        return document.querySelector('#email').value;
    }

    this.getPasswordValue = ()=>
    {
        return document.querySelector('#pssw').value;
    }

    this.postUserDataInRegisterRoute = async (userRegisterData) =>
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

    this.handlingErrorOfTurnTheRespondToJsonFunctionality = async (theResponse)=>
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

    this.getResponseMessageInString = (response) =>
    {
        let errorMessageProperity = Object.getOwnPropertyNames(response);
        let errorMessageString = response[errorMessageProperity[0]];
        return errorMessageString
    }

    this.appearSuccessfulOrFieledRigistringMessages = (responseMessage) =>
    {
        let registeringStateElement = document.querySelector('.registering-state');
        if('serverError' in responseMessage)
        {
            let failurMessage = document.querySelector('.message-container-failurColor');
            registeringStateElement.classList.remove('none');
            failurMessage.classList.remove('none');
        }
        else if('successRegister' in responseMessage)
        {
            let successfulMessage = document.querySelector('.message-container-successfulColor');
            registeringStateElement.classList.remove('none');
            successfulMessage.classList.remove('none');
        }
    }       

}

let myRegisterPage = new RegisterPage();
myRegisterPage.registerButton.addEventListener('click',myRegisterPage.sendUserRegisterDataToTheServer);


export default RegisterPage;