function RegisterPage()
{
    let registerPageObject = {
        registerButton: document.querySelector('fieldset.register div.register'),


        getUserNameValue()
        {
            return document.querySelector('#user-name').value;
        },

        getEmailValue()
        {
            return document.querySelector('#email').value;
        },

        getPasswordValue()
        {
            return document.querySelector('#pssw').value;
        },


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
        },

        async postUserDataInRegisterRoute(userRegisterData)
        {
            const response = await fetch('/register',{
                method:'POST',
                credentials:'same-origin',
                headers:{'Content-Type': 'application/json',},
                body: JSON.stringify(userRegisterData),
            })

            let theResponseInJsonStructure = await myRegisterPage.handlingErrorOfTurnTheRespondToJsonFunctionality(response);
            return theResponseInJsonStructure;
        },


        addTheErrorElementToTheFieldsetElement(errorElement, fieldsetElement)
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
        },

        getFieldsetThatCausedTheError(errorMessage)
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
        },

        cteateErrorElement(errorMessage)
        {
            let errorElement = document.createElement("div");
            errorElement.classList.add("errorMessageFirstApearance");
            let errorMessageProperity = Object.getOwnPropertyNames(errorMessage);
            let errorMessageString = errorMessage[errorMessageProperity[0]];
            errorElement.textContent = errorMessageString;

            return errorElement;
        },

        getLastErrorMessageElement()
        {
            return document.querySelector("form .errorMessageSecondApearance");
        },

        appearErrorMessageAccordingErrorType(errorMessage)
        {
            let lastErrorElement = myRegisterPage.getLastErrorMessageElement();
            if(lastErrorElement) lastErrorElement.remove();

            let errorElement = myRegisterPage.cteateErrorElement(errorMessage);
                    
            let theParentElementOfErrorElement = myRegisterPage.getFieldsetThatCausedTheError(errorMessage);
            if(!theParentElementOfErrorElement) return;

            myRegisterPage.addTheErrorElementToTheFieldsetElement(errorElement,theParentElementOfErrorElement);
        },


        prapereTheUserRegisterData()
        {
            const userNameValue = myRegisterPage.getUserNameValue();
            const emailValue = myRegisterPage.getEmailValue();
            const passwordValue = myRegisterPage.getPasswordValue();
            
            const userRegisterData = {
                userName: userNameValue,
                email: emailValue,
                password: passwordValue
            };

            return userRegisterData;
        },


        async sendUserRegisterDataToTheServer()
        {
            let userRegisterData = myRegisterPage.prapereTheUserRegisterData();
            console.log({userRegisterData})
            let response = await myRegisterPage.postUserDataInRegisterRoute(userRegisterData);
            myRegisterPage.appearErrorMessageAccordingErrorType(response);
        },
    }
    return registerPageObject;
}

let myRegisterPage = RegisterPage();
console.log(myRegisterPage)

myRegisterPage.registerButton.addEventListener('click',myRegisterPage.sendUserRegisterDataToTheServer);