// In this file all angles will get event to move products in cotegories:

// moveProductsPlus: add new product to the view and remove the first one.
const moveProductsPlus = (e)=>{
    let id = e.currentTarget.parentElement.id;
    let containerData = categoriesObjects[Number(id)];
    let container = e.currentTarget.parentElement.querySelector('div.container');
    
    moveRight(containerData,container);
}

// addEventToAllRA: add moveProductsPlus event to all right angles.
const addEventToAllRA = (angels)=>{
    for(let i of angels)
    {
        i.addEventListener('click',moveProductsPlus);
    }
}

// moveProductsMinus: add new product to the view from the beginning of the container and remove the last one.
const moveProductsMinus = (e)=>{
    let id = e.currentTarget.parentElement.id;
    let containerData = categoriesObjects[Number(id)];
    let container = e.currentTarget.parentElement.querySelector('div.container');

    moveLeft(containerData,container);
}

// addEventToAllLA: add moveProductsMinus event to all left angles.
const addEventToAllLA = (angels)=>{
    for(let i of angels)
    {
        i.addEventListener('click',moveProductsMinus);
    }
}

addEventToAllRA(rightAngles());
addEventToAllLA(leftAngles());