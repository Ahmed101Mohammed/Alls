// In this file the scripting determines the number of products in the Categories parts.
const Containers = {
    getAllContainers:()=> document.querySelectorAll('div.category div.container'),
    containersObjects: [],
    externalMethods:{
        generateProduct: (num)=>{
            return `
                        <!-- product card -->
                        <div class="product">

                            <!-- product photo -->
                            <div class="photo">
                                <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" alt="canone camera">
                            </div>

                            <!-- product details -->
                            <div class="details">
                                <!-- product title -->
                                <h3 class="title">product title${num}</h3>

                                <!-- product rate-->
                                <div class="rate">
                                    <i class="fa-solid fa-star s1"></i>
                                    <i class="fa-solid fa-star s2"></i>
                                    <i class="fa-solid fa-star s3"></i>
                                    <i class="fa-solid fa-star s4"></i>
                                    <i class="fa-solid fa-star s5"></i>
                                </div>

                                
                                <span class="avilable">avilable</span>
                                <span class="price">50$</span>
                            </div>

                        </div>
                    `
        }
    },

    getNumberFrom0To20: (theNumber)=>{
        let number = theNumber % 20;
        
        if(number < 0)
        {
            number += 20;
        }

        return number;
    },

    getIndexsOfTargetProducts: (TheStartedIndex,numOfWantedProducts)=>{

        TheStartedIndex = Containers.getNumberFrom0To20(TheStartedIndex - 1);

        let indexsOfWantedProducts = [];

        for(let productNumber = 0; productNumber < numOfWantedProducts; productNumber++)
        {
            TheStartedIndex = Containers.getNumberFrom0To20(TheStartedIndex);
    
            indexsOfWantedProducts.push(TheStartedIndex);
    
            TheStartedIndex--;
        }

        return indexsOfWantedProducts;
    },

    generate20StaticProducts: ()=>{
        let products = [];
    
        for(let productNumber = 0; productNumber < 20; productNumber++)
        {
            products.push(Containers.externalMethods.generateProduct(productNumber + 1));
        }
    
        return products;
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

    generateProductsInAllContainers: (TheStartedIndex,numberOfWantedProducts)=>{

    
        let products = Containers.generate20StaticProducts();
        let indexs = Containers.getIndexsOfTargetProducts(TheStartedIndex,numberOfWantedProducts);
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
        Containers.changeProductsWidth(productsNumber,containerProducts());
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
        let product = Containers.generate20StaticProducts();
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

        let tarqetProductIndex = Containers.getNumberFrom0To20(containerObject.index);
        let targetProduct = Containers.getNumberedProductByIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheEndOfAContainer(targetProduct,container);

        let theNewProductAsANode = container.lastChild.previousElementSibling;
        Containers.resizeProductNodeAccordingContainerProductsNumber(theNewProductAsANode,containerObject);

        let firtProductOfTheContainer = container.firstChild.nextElementSibling;
        
        let containerProductsNumper = containerObject.num;
        Containers.deleteElementWithSwappingTransitionAccordingContainerProductsNumberAndSwappingDirection(firtProductOfTheContainer,containerProductsNumper,'left');
    },

    addNewProductToContainerFromLeft: (containerObject, container)=>{

        let tarqetProductIndex = Containers.getNumberFrom0To20(containerObject.index - containerObject.num);
        let theNewProduct = Containers.getNumberedProductByIndexFrom0To19(tarqetProductIndex);
        Containers.addProductToTheStartOfAContainer(theNewProduct, container);

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