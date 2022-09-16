// This class have the apility to store special chars or get them.
class StringHashMap{
    constructor(string)
    {
        this.string = [];

        this.addString(string);
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