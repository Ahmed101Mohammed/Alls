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
    }
};

// Events:
    // Make tha angles appear when mouse over on the coteghory element.
addEventToListOfElements(getCategories(),Angles.appearAngles,"mouseover");

    // Make tha angles disApper when mouse out of the coteghory element.
addEventToListOfElements(getCategories(),Angles.disappearAngles,"mouseout");