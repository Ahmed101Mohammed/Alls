// Dom elements:
const navPhone = document.querySelector('header .nav-phone');
const firstSpan = document.querySelector('header .nav-phone .first');
const middleSpan = document.querySelector('header .nav-phone .middle');
const lastSpan = document.querySelector('header .nav-phone .last');
const navPar = document.querySelector('header+nav');
const signButton = document.querySelector('header div.sign');
const signButtonPhoneVersion = document.querySelector('header+nav ul li.sign');
// resize middleSpan function: 
const resize = ()=>{
    setTimeout(()=>{
        middleSpan.classList.add('eigty');
    },0)
}

// orign size: this function rturn the middleSpan to the origin size:
const orignSize = ()=>{
    setTimeout(()=>{
        middleSpan.classList.remove('eigty');
    },0)
}

// Appear navPar and disApear it function:
const appDis  = ()=>{
    if(navPar.classList.contains('none-nav'))
    {
        setTimeout(()=>{
            firstSpan.classList.add('rotate45');
            lastSpan.classList.add('rotate-45');
            middleSpan.classList.add('none')
        },0)

        setTimeout(()=>{
            navPar.classList.remove('none-nav');
        },200)
        
    }
    else
    {
        setTimeout(()=>{
            firstSpan.classList.remove('rotate45');
            lastSpan.classList.remove('rotate-45');
            middleSpan.classList.remove('none');
        },0)

        setTimeout(()=>{
            navPar.classList.add('none-nav');
        },200)
        
    }
}

//open sign page function
const openSignPage = ()=>{
    window.open('/sign','_self')
} 


// Add hover ListenerEvent for navPhone element:
navPhone.addEventListener('mouseover',resize);
navPhone.addEventListener('mouseout',orignSize);

// Add click ListenerEvent for navPhone element:
navPhone.addEventListener('click',appDis);

// Add click listenerEvent for sign button:
signButton.addEventListener('click',openSignPage)

// Add click listenerEvent for sign button in phone version:
signButtonPhoneVersion.addEventListener('click',openSignPage)