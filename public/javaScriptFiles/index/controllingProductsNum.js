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

    addNewProductToContainerFromRight: (containerObject, container)=>{
        containerObject.addToIndexValue(1); // indcrease the starter index.

        let tarqetProductIndex = Containers.getNumberFrom0To20(containerObject.index);
        let targetProduct = Containers.getNumberedProductByIndexFrom0To19(tarqetProductIndex);

        let numberOfProductInTheContainer = containerObject.num;

        container.innerHTML += targetProduct;
        let theNewProductAsANode = container.lastChild.previousElementSibling;
        theNewProductAsANode.style.width = `${100/numberOfProductInTheContainer}%`;

        let firtProductOfTheContainer = container.firstChild.nextElementSibling;

        setTimeout(()=>{
            firtProductOfTheContainer.classList.add(choseClass(numberOfProductInTheContainer));
        },0);
        setTimeout(()=>{
            firtProductOfTheContainer.style.display = 'none';
            firtProductOfTheContainer.remove();
        },600)        
    },

    addNewProductToContainerFromLeft: (containerObject, container)=>{
        let indexOfTheTargetProduct = Containers.getNumberFrom0To20(containerObject.index - containerObject.num);
       
        
        let theNewProduct = Containers.getNumberedProductByIndexFrom0To19(indexOfTheTargetProduct);

        containerObject.addToIndexValue(-1); // decrease the starter index.

        let numberOfProductInTheContainer = containerObject.num;

        container.innerHTML = theNewProduct + container.innerHTML;

        let theNewProductAsANode = container.firstChild.nextElementSibling;
        theNewProductAsANode.style.width = `${100/numberOfProductInTheContainer}%`;

        let lastProductOfTheContainer = container.lastChild.previousElementSibling;

        setTimeout(()=>{
            lastProductOfTheContainer.classList.add(choseClassL(numberOfProductInTheContainer));
        },0);
        setTimeout(()=>{
            lastProductOfTheContainer.style.display = 'none';
            lastProductOfTheContainer.remove();
        },600)        
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

// chose class name
const choseClass = (num)=>{
    switch(num){
        case 1:
            return 'l1';
        case 2:
            return 'l2';
        case 3:
            return 'l3';
        case 4:
            return 'l4';
        case 5:
            return 'l5';
        case 6:
            return 'l6';
        case 7:
            return 'l7';
    }
}

// chose class name
const choseClassL = (num)=>{
    switch(num){
        case 1:
            return 'lp1';
        case 2:
            return 'lp2';
        case 3:
            return 'lp3';
        case 4:
            return 'lp4';
        case 5:
            return 'lp5';
        case 6:
            return 'lp6';
        case 7:
            return 'lp7';
    }
}

const moveRight = (containerObject,container)=>{
    let products = Containers.generate20StaticProducts();
    containerObject.addToIndexValue(1);

    let nextProductIndex = Containers.getNumberFrom0To20(containerObject.index);

    container.innerHTML+=products[nextProductIndex];
    
    let num = containerObject.num;
    container.lastChild.previousElementSibling.style.width = `${100/num}%`;

    setTimeout(()=>{
        container.firstChild.nextElementSibling.classList.add(choseClass(num));
    },0);
    setTimeout(()=>{
        container.firstChild.nextElementSibling.style.display = 'none';
        container.firstChild.nextElementSibling.remove();
    },600)
       
}

const moveLeft = (containerObject,container)=>{
    let products = Containers.generate20StaticProducts();
    

    let num = containerObject.num;
    let index = (containerObject.index % 20)-num;
    index = (index < 0)? 20 + index: index;

    let containerElements = products[index] + container.innerHTML;

    container.innerHTML= containerElements;
        
    container.firstChild.nextElementSibling.style.width = `${100/num}%`

    setTimeout(()=>{
        container.lastChild.previousElementSibling.classList.add(choseClassL(num));
    },0);
    setTimeout(()=>{
        container.lastChild.previousElementSibling.style.display = 'none';
        container.lastChild.previousElementSibling.remove();
        containerObject.addToIndexValue(-1);
    },600)
       
}



window.addEventListener('resize',Containers.generateProductsInContainersAccordingWindowWidth); // set the number of products when the page window resize;

Containers.generateProductsInContainersAccordingWindowWidth(); // set the number of products when page refresh;
// external:
const Diarection = {
    getDirectionValue: (directionName)=>{
        let valueOfDirectionName = null;
        
        switch(directionName)
        {
            case "left":
                valueOfDirectionName = -1;
                break;
            case "right":
                valueOfDirectionName = 1;
                break;
            case "next":
                valueOfDirectionName = 1;
                break;
            case "previouse":
                valueOfDirectionName = -1;
                break;
            default:
                valueOfDirectionName = 0;
                break;
        }

        return valueOfDirectionName;
        
    }
}