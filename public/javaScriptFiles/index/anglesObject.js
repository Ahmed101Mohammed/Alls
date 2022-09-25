import { Containers } from "./controllingProductsNum.js";

const Angles = {
    rightAngles: ()=> document.querySelectorAll('.right-angle'),
    leftAngles: ()=> document.querySelectorAll('.left-angle'),

    appearAngles: (e)=>{
        let rightAngle = e.currentTarget.querySelector('.right-angle');
        let leftAngle = e.currentTarget.querySelector('.left-angle');
        rightAngle.style.display = 'flex';
        leftAngle.style.display = 'flex';
    },

    disappearAngles: (e)=>{
        let rightAngle = e.currentTarget.querySelector('.right-angle');
        let leftAngle = e.currentTarget.querySelector('.left-angle');
        rightAngle.style.display = 'none';
        leftAngle.style.display = 'none';
    },

    appearNextPtoduct: (e)=>{
        let idOfCategory = e.currentTarget.parentElement.id;
        let categoryObject = Containers.containersObjects[Number(idOfCategory)];
        
        let categoryContainer = e.currentTarget.parentElement.querySelector('div.container');
        

        //moveRight(categoryObject,categoryContainer);
        Containers.addNewProductToContainerFromRight(categoryObject,categoryContainer)
    },

    appearPreviousPtoduct: (e)=>{
        let idOfCategory = e.currentTarget.parentElement.id;
        let categoryObject = Containers.containersObjects[Number(idOfCategory)];
        
        let categoryContainer = e.currentTarget.parentElement.querySelector('div.container');
    
        //moveLeft(categoryObject,categoryContainer);
        Containers.addNewProductToContainerFromLeft(categoryObject,categoryContainer);
    },
};

// Events:
    // Make tha angles appear when mouse over on the coteghory element.
addEventToListOfElements(getCategories(),Angles.appearAngles,"mouseover");

    // Make tha angles disApper when mouse out of the coteghory element.
addEventToListOfElements(getCategories(),Angles.disappearAngles,"mouseout");

    // add appearNextProduct function as a click event to all right angles.
addEventToListOfElements(Angles.rightAngles(),Angles.appearNextPtoduct,"click"); 

    // add appearPreviousPtoduct function as a click event to all left angles.
addEventToListOfElements(Angles.leftAngles(),Angles.appearPreviousPtoduct,"click"); 