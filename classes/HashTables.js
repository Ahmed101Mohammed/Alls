// This class have the apility to store special chars or get them.
class StringHashMap{
    constructor(string)
    {
        addString(string);

        this.string = [];
    }

    add(char)
    {
        const index = char.charCodeAt();

        if(this.string[index] === undefined)
        {
            this.string[index] = 0;
        }

    }

    addString(string)
    {
        for(let char of string)
        {
            this.add(char);
        }
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

        if(this.string[index] !== undefined)
        {
            return true;
        }

        return false;
    }
}

// export:
module.exports = {StringHashMap};