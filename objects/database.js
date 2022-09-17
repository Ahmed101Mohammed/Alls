const database = {
    isThisValueExisting: async(module,data)=>{
        let isItExist = await module.findOne(data).then(user=>{
            console.log('u',user);
            if(user !== null && user.userName === userName)
            {
                return true
            }
        });

        if(isItExist) return true;

        return false;
    }
}

// exports:
module.exports = database;