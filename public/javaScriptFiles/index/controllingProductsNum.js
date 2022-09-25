// In this file the scripting determines the number of products in the Categories parts.
const Containers = {
    getAllContainers:()=> document.querySelectorAll('div.category div.container'),
    containersObjects: [],

    

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

    changeProductsWidth: (numOfProducts, products)=>{
        for(let product of products)
        {
            product.style.width = `${100 / numOfProducts}%`;
        }
    },

    generateProductsAndFixItsWidth: (productsNumber)=>{
        let theStarterIndex = productsNumber;
        Containers.generateProductsInAllContainers(theStarterIndex,productsNumber);
        Containers.changeProductsWidth(productsNumber,Products.allProducts());
    },

    generateProductsInContainersAccordingWindowWidth: ()=>{
        if(window.innerWidth > 1650)
        {
            const productsNum = 7;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth > 1530)
        {
            const productsNum = 6;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth > 1200)
        {
            const productsNum = 5;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth > 1000)
        {
            const productsNum = 4;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth > 730)
        {
            const productsNum = 3;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth > 455)
        {
            const productsNum = 2;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
        else if(window.innerWidth < 455)
        {
            const productsNum = 1;
            Containers.generateProductsAndFixItsWidth(productsNum);
        }
    
    },
    getNumberedProductByIndexFrom0To19: (TheIndexOfTheProduct)=>{
        let product = Products.generate20StaticProducts();
        let targetProduct = product[TheIndexOfTheProduct];

        return targetProduct;
    },

    addProductToTheEndOfAContainer: (productElement,containerElement)=>{
        containerElement.innerHTML += productElement;
    },

    addProductToTheStartOfAContainer: (productElement,containerElement)=>{
        containerElement.innerHTML = productElement + containerElement.innerHTML;
    },

    resizeProductNodeAccordingContainerProductsNumber:(productNode,containerObject)=>{
        let numberOfProductsInTheContainer = containerObject.num;
        productNode.style.width = `${ 100 / numberOfProductsInTheContainer }%`;
    },

    getElementSwappingClassByContainerProductsNumberandSwappingDirection: (containerProductsNumber,swappingDirection)=>{

        let className = `${swappingDirection}SwappingWhenNumberOfItemsEqual${containerProductsNumber}`;
        return className;
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

    addNewProductToContainerFromRight: (containerObject, container)=>{
        containerObject.addToIndexValue(1); // indcrease the starter index.

        let tarqetProductIndex = Products.Math.getNumberFrom0To20(containerObject.index);
        let targetProduct = Containers.getNumberedProductByIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheEndOfAContainer(targetProduct,container);

        let theNewProductAsANode = container.lastChild.previousElementSibling;
        Containers.resizeProductNodeAccordingContainerProductsNumber(theNewProductAsANode,containerObject);

        let firtProductOfTheContainer = container.firstChild.nextElementSibling;
        
        let containerProductsNumper = containerObject.num;
        Containers.deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection(firtProductOfTheContainer,containerProductsNumper,'left');
    },

    addNewProductToContainerFromLeft: (containerObject, container)=>{

        let tarqetProductIndex = Products.Math.getNumberFrom0To20(containerObject.index - containerObject.num);
        let targetProduct = Containers.getNumberedProductByIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheStartOfAContainer(targetProduct, container);

        containerObject.addToIndexValue(-1); // decrease the starter index.

        let theNewProductAsANode = container.firstChild.nextElementSibling;
        Containers.resizeProductNodeAccordingContainerProductsNumber(theNewProductAsANode,containerObject)

        let lastProductOfTheContainer = container.lastChild.previousElementSibling;
        let containerProductsNumper = containerObject.num;
        Containers.deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection(lastProductOfTheContainer,containerObject.num,'right');
    }
};
// class category: had the index and num atributes.
class Container{
    constructor()
    {
        this.index = 0;
        this.num = 0;
    }

    addToIndexValue = (value)=>{
        this.index += value;
    }
}

window.addEventListener('resize',Containers.generateProductsInContainersAccordingWindowWidth); // set the number of products when the page window resize;

Containers.generateProductsInContainersAccordingWindowWidth(); // set the number of products when page refresh;
// external: