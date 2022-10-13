import Container from './containerClass.js';

export const Containers = {

    getAllContainers:()=> document.querySelectorAll('div.category div.container'),
    containersObjects: [],

    generateProductsInContainersAccordingWindowWidth: ()=>{
        if(window.innerWidth > 1650)
        {
            const productsNum = 7;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth > 1530)
        {
            const productsNum = 6;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth > 1200)
        {
            const productsNum = 5;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth > 1000)
        {
            const productsNum = 4;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth > 730)
        {
            const productsNum = 3;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth > 455)
        {
            const productsNum = 2;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
        else if(window.innerWidth < 455)
        {
            const productsNum = 1;
            Containers.generateProductsInContainersAndFixTheseWidth(productsNum);
        }
    
    },

    generateProductsInContainersAndFixTheseWidth: (productsNumber)=>{
        let theStarterIndex = productsNumber;
        Containers.generateProductsInAllContainers(theStarterIndex,productsNumber);
        Products.changeProductsWidthAcordingProductsNumper(productsNumber);
    },

    generateProductsInAllContainers: (TheStartedIndex,numberOfWantedProducts)=>{

        let products = Products.generate20StaticProducts();
        let indexs = Products.getIndexsOfTargetProducts(TheStartedIndex,numberOfWantedProducts);
        let allContainers = Containers.getAllContainers();
        
        for(let container of allContainers)
        {
            Containers.createContainerObject(container,TheStartedIndex,numberOfWantedProducts);
            container.innerHTML = '';
            Containers.addTargetProductsToTheContainer(indexs,products,container);
        }    
    },

    createContainerObject: (containerElement,TheStartedIndex,numberOfWantedProducts)=>{
        let id = containerElement.parentElement.id;
        Containers.containersObjects[Number(id)] = new Container();
        Containers.containersObjects[Number(id)].index = TheStartedIndex - 1;
        Containers.containersObjects[Number(id)].num = numberOfWantedProducts;
    },

    addTargetProductsToTheContainer: (indexsOfTargetProducts,productsList,theContainer)=>{
        for(let index = indexsOfTargetProducts.length-1 ; index > -1; index--)
            {
                theContainer.innerHTML += productsList[indexsOfTargetProducts[index]];
            }
    },

    addNewProductToContainerFromRight: (containerObject, container)=>{
        containerObject.addToIndexValue(1); // indcrease the starter index.

        let tarqetProductIndex = Products.Math.getNumberFrom0To20(containerObject.index);
        let targetProduct = Products.getNumberedProductAccordingIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheEndOfAContainer(targetProduct,container);

        let theNewProductAsANode = container.lastChild.previousElementSibling;
        Containers.resizeProductNodeAccordingContainerProductsNumber(theNewProductAsANode,containerObject);

        let firtProductOfTheContainer = container.firstChild.nextElementSibling;
        
        let containerProductsNumper = containerObject.num;
        Containers.deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection(firtProductOfTheContainer,containerProductsNumper,'left');
    },

    addProductToTheEndOfAContainer: (productElement,containerElement)=>{
        containerElement.innerHTML += productElement;
    },

    addNewProductToContainerFromLeft: (containerObject, container)=>{

        let tarqetProductIndex = Products.Math.getNumberFrom0To20(containerObject.index - containerObject.num);
        let targetProduct = Products.getNumberedProductAccordingIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheStartOfAContainer(targetProduct, container);
        containerObject.addToIndexValue(-1); // decrease the starter index.

        let theNewProductAsANode = container.firstChild.nextElementSibling;
        Containers.resizeProductNodeAccordingContainerProductsNumber(theNewProductAsANode,containerObject)

        let lastProductOfTheContainer = container.lastChild.previousElementSibling;
        let containerProductsNumper = containerObject.num;
        Containers.deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection(lastProductOfTheContainer,containerProductsNumper,'right');
    },

    addProductToTheStartOfAContainer: (productElement,containerElement)=>{
        containerElement.innerHTML = productElement + containerElement.innerHTML;
    },

    resizeProductNodeAccordingContainerProductsNumber:(productNode,containerObject)=>{
        let numberOfProductsInTheContainer = containerObject.num;
        productNode.style.width = `${ 100 / numberOfProductsInTheContainer }%`;
    },    

    deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection: (theElement,containerProductsNumber,swappingDirection)=>{
        setTimeout(()=>{
            let swappingClass = Containers.getElementSwappingClassByContainerProductsNumberandSwappingDirection(containerProductsNumber,swappingDirection);
            theElement.classList.add(swappingClass);
        },0);
        setTimeout(()=>{
            theElement.style.display = 'none';
            theElement.remove();
        },600) 
    },

    getElementSwappingClassByContainerProductsNumberandSwappingDirection: (containerProductsNumber,swappingDirection)=>{

        let className = `${swappingDirection}SwappingWhenNumberOfItemsEqual${containerProductsNumber}`;
        return className;
    },
};



window.addEventListener('resize',Containers.generateProductsInContainersAccordingWindowWidth); // set the number of products when the page window resize;

Containers.generateProductsInContainersAccordingWindowWidth(); // set the number of products when page refresh;
// external: