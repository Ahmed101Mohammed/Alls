import { Containers } from "./controllingProductsNum.js";
import { FEL } from "../../library/frontEndLibrary.js";

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
        Containers.addNewProductToContainerFromRight(categoryObject,categoryContainer)
    },

    appearPreviousPtoduct: (e)=>{
        let idOfCategory = e.currentTarget.parentElement.id;
        let categoryObject = Containers.containersObjects[Number(idOfCategory)];
        let categoryContainer = e.currentTarget.parentElement.querySelector('div.container');
        Containers.addNewProductToContainerFromLeft(categoryObject,categoryContainer);
    },
};

// Events:
FEL.addEventToListOfElements(getCategories(),Angles.appearAngles,"mouseover");
FEL.addEventToListOfElements(getCategories(),Angles.disappearAngles,"mouseout");
FEL.addEventToListOfElements(Angles.rightAngles(),Angles.appearNextPtoduct,"click"); 
FEL.addEventToListOfElements(Angles.leftAngles(),Angles.appearPreviousPtoduct,"click"); 