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

}

let myRegisterPage = new RegisterPage();
