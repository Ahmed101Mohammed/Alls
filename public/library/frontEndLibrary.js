const addEventToListOfElements = (listOfElements,eventFunction,eventType)=>{
    for(let element of listOfElements)
    {
        element.addEventListener(eventType,eventFunction);
    }
}

export const FEL = {
    addEventToListOfElements,
};