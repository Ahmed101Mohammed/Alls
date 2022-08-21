// In this file: will take all categories and give them an event to appear angles when touch them by user mouse pinter.

// appearAngles: this function appear Angles when the mouse hover in the  category section.
const appearAngles = (e)=>{
    let rAngle = e.currentTarget.querySelector('.right-angle');
    let lAngle = e.currentTarget.querySelector('.left-angle');
    rAngle.style.display = 'flex';
    lAngle.style.display = 'flex';
}

// disappearAngles: this function disappear Angles when the mouse go out from the  category section.
const disappearAngles = (e)=>{
    let rAngle = e.currentTarget.querySelector('.right-angle');
    let lAngle = e.currentTarget.querySelector('.left-angle');
    rAngle.style.display = 'none';
    lAngle.style.display = 'none';
}

// giveEvents : this function giv all categories in home page this events mouseover ==> appearAngles, mouseout ==> disappearAngles.
const giveEvents = ()=>{
    let categories = getCategories();

    for(let i of categories)
    {
        i.addEventListener('mouseover',appearAngles);
        i.addEventListener('mouseout',disappearAngles);
    }
}


giveEvents();// function run. 