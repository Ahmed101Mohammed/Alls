import RegisterPage from '../javaScriptFiles/register/registerPageClass.js';

class FormErrorsRender
{
    #errorMessage;
    #Register

    constructor(errorMessage)
    {
        this.appearErrorMessageAccordingErrorType = this.appearErrorMessageAccordingErrorType.bind(this);
        this.getLastErrorMessageElement = this.getLastErrorMessageElement.bind(this);
        this.cteateErrorElement = this.cteateErrorElement.bind(this);
        this.getFieldsetThatCausedTheError = this.getFieldsetThatCausedTheError.bind(this);
        this.addTheErrorElementToTheFieldsetElement = this.addTheErrorElementToTheFieldsetElement.bind(this);
        this.#errorMessage = errorMessage;
        this.#Register = new RegisterPage();
    }

    appearErrorMessageAccordingErrorType = () =>
    {
        let lastErrorElement = this.getLastErrorMessageElement();
        if(lastErrorElement) lastErrorElement.remove();

        let errorElement = this.cteateErrorElement();
                    
        let theParentElementOfErrorElement = this.getFieldsetThatCausedTheError(this.#errorMessage);
        if(!theParentElementOfErrorElement) return;

        this.addTheErrorElementToTheFieldsetElement(errorElement,theParentElementOfErrorElement);
    }

    getLastErrorMessageElement = () =>
    {
        return document.querySelector("form .errorMessageSecondApearance");
    }
        
    cteateErrorElement = () =>
    {
        let errorElement = document.createElement("div");
        errorElement.classList.add("errorMessageFirstApearance");

        let errorMessageString = this.#Register.getResponseMessageInString(this.#errorMessage);
        errorElement.textContent = errorMessageString;

        return errorElement;
    }

    getFieldsetThatCausedTheError = ()=>
    {
        let theFieldsetThatCausedTheError;

        if("userNameError" in this.#errorMessage)
        {
            theFieldsetThatCausedTheError = document.querySelector('fieldset.user-name');    
        }
        else if("passwordError" in this.#errorMessage)
        {
            theFieldsetThatCausedTheError = document.querySelector('fieldset.pssw');
        }
        else if("emailError" in this.#errorMessage)
        {    
           theFieldsetThatCausedTheError = document.querySelector('fieldset.email');
        }

        return theFieldsetThatCausedTheError;
    }


    addTheErrorElementToTheFieldsetElement = (errorElement, fieldsetElement) =>
    {
        fieldsetElement.appendChild(errorElement);
        let errorElementContent = errorElement.textContent;
        errorElement.textContent = "";

        setTimeout(()=>{
            errorElement.classList.add('errorMessageSecondApearance');
        },0)
        setTimeout(()=>{
            errorElement.textContent = errorElementContent;
        },600)
    }       
}

export default FormErrorsRender;