// This class have the apility to store special chars or get them.
class HashMap{
    constructor()
    {
        this.specialChars = [];
    }

    specialCharsWanted()
    {
        for(let i of `!@#$%^&*(){}[]?:;_-`)
        {
            this.specialChars[i.charCodeAt()] = 0;
        }
    }

    specialCharsNotWanted()
    {
        for(let i of `\\\`'"/|,<>~`)
        {
            this.specialChars[i.charCodeAt()] = 0;
        }
    }

    get(char)
    {
        const index = char.charCodeAt();

        if(this.specialChars[index] !== undefined)
        {
            return true;
        }

        return false;
    }
}

// export:
module.exports = HashMap;