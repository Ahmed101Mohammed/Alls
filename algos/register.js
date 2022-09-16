const Register = {
    isACorrectEmail: (email)=>{
        const space = " ";
        const atSign = "@";

        if(space.test(email) || !atSign.test(email))
        {
            return false;
        }

        return true;
    }
}