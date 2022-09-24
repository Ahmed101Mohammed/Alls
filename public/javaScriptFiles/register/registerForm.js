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

    postUserDataInRegisterRoute: async(userRegisterData)=>{
        const response = await fetch('/register',{
            method:'POST',
            credentials:'same-origin',
            headers:{'Content-Type': 'application/json',},
            body: JSON.stringify(userRegisterData),
        })

        try{
            const responseMessage = new response.json();
            console.log(responseMessage);
            return responseMessage;
        }
        catch(e)
        {
           console.error({"FielsdToSend":"No Response"})
        }
    },

    sendDataToTheServer: ()=>{
        const userName = RegisterForm.fieldsetElements.userName.inputElement();
        const email = RegisterForm.fieldsetElements.email.inputElement();
        const password = RegisterForm.fieldsetElements.password.inputElement();

        const data = {userName,email,password};
    }  
}

