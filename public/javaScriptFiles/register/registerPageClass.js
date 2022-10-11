function RegisterPage()
{
        this.registerButton = document.querySelector('fieldset.register div.register'),


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


        this.addTheErrorElementToTheFieldsetElement = (errorElement, fieldsetElement) =>
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

        this.getFieldsetThatCausedTheError = (errorMessage)=>
        {
            let theFieldsetThatCausedTheError;

            if("userNameError" in errorMessage)
            {
                theFieldsetThatCausedTheError = document.querySelector('fieldset.user-name');
                
            }
            else if("passwordError" in errorMessage)
            {
                theFieldsetThatCausedTheError = document.querySelector('fieldset.pssw');
            }
            else if("emailError" in errorMessage)
            {
                
                theFieldsetThatCausedTheError = document.querySelector('fieldset.email');
            }

            return theFieldsetThatCausedTheError;
        }

        this.cteateErrorElement = (errorMessage) =>
        {
            let errorElement = document.createElement("div");
            errorElement.classList.add("errorMessageFirstApearance");
            let errorMessageProperity = Object.getOwnPropertyNames(errorMessage);
            let errorMessageString = errorMessage[errorMessageProperity[0]];
            errorElement.textContent = errorMessageString;

            return errorElement;
        }

        this.getLastErrorMessageElement = () =>
        {
            return document.querySelector("form .errorMessageSecondApearance");
        }

        this.appearErrorMessageAccordingErrorType = (errorMessage) =>
        {
            let lastErrorElement = this.getLastErrorMessageElement();
            if(lastErrorElement) lastErrorElement.remove();

            let errorElement = this.cteateErrorElement(errorMessage);
                    
            let theParentElementOfErrorElement = this.getFieldsetThatCausedTheError(errorMessage);
            if(!theParentElementOfErrorElement) return;

            this.addTheErrorElementToTheFieldsetElement(errorElement,theParentElementOfErrorElement);
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


        this.sendUserRegisterDataToTheServer = async () =>
        {
            let userRegisterData = this.prapereTheUserRegisterData();
            let response = await this.postUserDataInRegisterRoute(userRegisterData);
            this.appearErrorMessageAccordingErrorType(response);
        }
}

let myRegisterPage = new RegisterPage();
myRegisterPage.registerButton.addEventListener('click',myRegisterPage.sendUserRegisterDataToTheServer);