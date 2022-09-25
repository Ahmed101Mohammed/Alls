let RegisterForm = {
    htmlElement: ()=> document.querySelector('form'),

    fieldsetElements: {
        userName : {

            htmlElement: ()=> RegisterForm.htmlElement().querySelector('fieldset.user-name'),
            inputElement: ()=> RegisterForm.fieldsetElements.userName.htmlElement().querySelector('input#user-name'),

        },

        email : {

            htmlElement: ()=> RegisterForm.htmlElement().querySelector('fieldset.email'),
            inputElement: ()=> RegisterForm.fieldsetElements.email.htmlElement().querySelector('input#email'),              
                
        },

        password : {

                htmlElement: ()=> RegisterForm.htmlElement().querySelector('fieldset.pssw'),
                inputElement: ()=> RegisterForm.fieldsetElements.password.htmlElement().querySelector('input#pssw')

            },

        register : {

            htmlElement: ()=> RegisterForm.htmlElement().querySelector('fieldset.register'),
            registerButton: ()=> RegisterForm.fieldsetElements.register.htmlElement().querySelector('div.register'),

        }
    },

    postUserDataInRegisterRoute: {
        mainMethod: async(userRegisterData)=>{
            const response = await fetch('/register',{
                method:'POST',
                credentials:'same-origin',
                headers:{'Content-Type': 'application/json',},
                body: JSON.stringify(userRegisterData),
            })

            let theResponseInJsonStructure = await RegisterForm.postUserDataInRegisterRoute.turnTheRespondToJsonHandlingError(response);
            return theResponseInJsonStructure;
        },

        turnTheRespondToJsonHandlingError: async(theResponse)=>{
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
    },

    sendUserRegisterDataToTheServer: {
        mainMethod: async()=>{
            let userRegisterData = RegisterForm.sendUserRegisterDataToTheServer.prapereTheUserRegisterData();
            let response = await RegisterForm.postUserDataInRegisterRoute.mainMethod(userRegisterData);
            RegisterForm.sendUserRegisterDataToTheServer.appearErrorMessageAccordingErrorType.mainMethod(response);

        },

        prapereTheUserRegisterData:()=>{
            const userNameValue = RegisterForm.fieldsetElements.userName.inputElement().value;
            const emailValue = RegisterForm.fieldsetElements.email.inputElement().value;
            const passwordValue = RegisterForm.fieldsetElements.password.inputElement().value;
            
            const userRegisterData = {
                userName: userNameValue,
                email: emailValue,
                password: passwordValue
            };

            return userRegisterData;
        },

        appearErrorMessageAccordingErrorType: {
            mainMethod: (errorMessage)=>{
                let errorElement = RegisterForm.sendUserRegisterDataToTheServer.appearErrorMessageAccordingErrorType.createElement(errorMessage);
                let theParentElementOferrorElement = RegisterForm.sendUserRegisterDataToTheServer.appearErrorMessageAccordingErrorType.getFieldsetThatCausedTheError(errorMessage);
                if(!theParentElementOferrorElement) return;

                RegisterForm.sendUserRegisterDataToTheServer.appearErrorMessageAccordingErrorType.addTheErrorElementToTheFieldset(theParentElementOferrorElement,errorElement);
                
            },

            cteateErrorElement: (errorMessage)=>{
                let errorElement = document.createElement("div");
                errorElement.classList.add("errorMessage");
                let errorMessageProperity = Object.getOwnPropertyNames(errorMessage);
                let errorMessageString = errorElement[errorMessageProperity[0]];

                errorElement.textContent = errorMessageString;

                return errorElement;
            },
            
            getFieldsetThatCausedTheError: (errorMessage)=>{
                let theFieldsetThatCauedTheError;

                if("userNameError" in errorMessage)
                {
                    theFieldsetThatCauedTheError = RegisterForm.fieldsetElements.userName.htmlElement();
                    
                }
                else if("passwordError" in errorMessage)
                {
                    theFieldsetThatCauedTheError = RegisterForm.fieldsetElements.password.htmlElement();
                }
                else if("emailError" in errorMessage)
                {
                    theFieldsetThatCauedTheError = RegisterForm.fieldsetElements.email.htmlElement();
                }

                return theFieldsetThatCauedTheError;
            },

            addTheErrorElementToTheFieldset: (errorElement, fieldsetElement)=>{
                fieldsetElement.appendChild(errorElement);
            }

        }

    }
}

RegisterForm.fieldsetElements.register.registerButton().addEventListener('click',RegisterForm.sendUserRegisterDataToTheServer.mainMethod)