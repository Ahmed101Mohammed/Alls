import { moveingMethods } from "../library/movingMethods.js";

// Opjects:
let phoneVersion = {
    
    navParButton: {
        htmlElement: document.querySelector('header .nav-phone'),

        firstSpan: document.querySelector('header .nav-phone .first'),
        middleSpan:  document.querySelector('header .nav-phone .middle'),
        lastSpan: document.querySelector('header .nav-phone .last'),

        returnMiddleSpanToOrginSize: ()=>{
    
            setTimeout(()=>{
                phoneVersion.navParButton.middleSpan.classList.remove('eigty');
            },0)
        },

        lessTheWidthOfMiddleSpan: ()=>{
            setTimeout(()=>{
                phoneVersion.navParButton.middleSpan.classList.add('eigty');
            },0)
        }
    },

    navPar: {
        htmlElement: document.querySelector('.navParOfPhoneVersion'),
        signButton: document.querySelector('header+nav ul li.sign'),
    },

    appearTheNavPar: ()=>{
        setTimeout(()=>{
            phoneVersion.navParButton.firstSpan.classList.add('rotate45');
            phoneVersion.navParButton.lastSpan.classList.add('rotate-45');
            phoneVersion.navParButton.middleSpan.classList.add('none')
        },0)

        setTimeout(()=>{
            phoneVersion.navPar.htmlElement.classList.remove('none-nav');
        },200)
    },

    disappearTheNavPar: ()=>{
        setTimeout(()=>{
            phoneVersion.navParButton.firstSpan.classList.remove('rotate45');
            phoneVersion.navParButton.lastSpan.classList.remove('rotate-45');
            phoneVersion.navParButton.middleSpan.classList.remove('none');
        },0)

        setTimeout(()=>{
            phoneVersion.navPar.htmlElement.classList.add('none-nav');
        },200)
    },

    appearAndDisappearTheNavPar: ()=>{

        if(phoneVersion.navPar.htmlElement.classList.contains('none-nav'))
        {
            phoneVersion.appearTheNavPar();
        }
        else
        {
            phoneVersion.disappearTheNavPar();
        }
    }
    
} 

// Add hover ListenerEvent for navParControllerInPhoneVersion element:
phoneVersion.navParButton.htmlElement.addEventListener('mouseover',phoneVersion.navParButton.lessTheWidthOfMiddleSpan);
phoneVersion.navParButton.htmlElement.addEventListener('mouseout',phoneVersion.navParButton.returnMiddleSpanToOrginSize);

// Add click ListenerEvent for navParControllerInPhoneVersion element:
phoneVersion.navParButton.htmlElement.addEventListener('click',phoneVersion.appearAndDisappearTheNavPar);

// Add click listenerEvent for sign button:
const signButton = document.querySelector('header div.sign');
signButton.addEventListener('click',moveingMethods.moveToSignPage)

// Add click listenerEvent for sign button in phone version:
phoneVersion.navPar.signButton.addEventListener('click',moveingMethods.moveToSignPage)