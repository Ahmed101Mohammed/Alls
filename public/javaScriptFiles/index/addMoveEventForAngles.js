// In this file all angles will get event to move products in cotegories:

// appearNextProduct: this function appear the next product in the container view from right side.
const appearNextPtoduct = (e)=>{
    let idOfCategory = e.currentTarget.parentElement.id;
    let categoryObject = categoriesObjects[Number(idOfCategory)];

    let categoryContainer = e.currentTarget.parentElement.querySelector('div.container');
    
    moveRight(categoryObject,categoryContainer);
}

// appearPreviousPtoduct: this function appear the previous product in the container view from left side.
const appearPreviousPtoduct = (e)=>{
    let idOfCategory = e.currentTarget.parentElement.id;
    let categoryObject = categoriesObjects[Number(idOfCategory)];
    let categoryContainer = e.currentTarget.parentElement.querySelector('div.container');

    moveLeft(categoryObject,categoryContainer);
}

// addClickEventToListOfElements: this functio take list of elements and function and give each element an click evenet that respond the function.
const addClickEventToListOfElements = (listOfElements,eventFunction)=>{
    for(let element of listOfElements)
    {
        element.addEventListener('click',eventFunction);
    }
}


addClickEventToListOfElements(rightAngles(),appearNextPtoduct); // add appearNextProduct function as a click event to all right angles.

addClickEventToListOfElements(leftAngles(),appearPreviousPtoduct); // add appearPreviousPtoduct function as a click event to all left angles.