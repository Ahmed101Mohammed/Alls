// modules:
const path = require('path');
const {StringHashMap} = require(path.join(__dirname,'..','classes','HashTables.js'))


// SearchObject.
const Search = {

    searchAboutLetterInString: (string,letter$)=>{
        let stringHashMap = new StringHashMap(string);

        for(let char of letter$)
        {
            if(stringHashMap.get(char))
            {
                return true;
            }
        }
        return false;
    },
}

// export:
module.exports = Search;