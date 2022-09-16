// addClickEventToListOfElements: this function take list of elements and function and eventType give each element an evenet according the eventType that respond the function.
const addEventToListOfElements = (listOfElements,eventFunction,eventType)=>{
    for(let element of listOfElements)
    {
        element.addEventListener(eventType,eventFunction);
    }
}