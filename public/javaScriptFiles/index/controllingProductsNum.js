// In this file the scripting determines the number of products in the Categories parts.
const Containers = {
    getAllContainers:()=> document.querySelectorAll('div.category div.container'),
    categoriesObjects: [],
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

    createContainerObject: (containerElements,TheStartedIndex,numberOfWantedProducts)=>{
        let id = containerElements.parentElement.id;
        Containers.categoriesObjects[Number(id)] = new Container();
        Containers.categoriesObjects[Number(id)].index = TheStartedIndex;
        Containers.categoriesObjects[Number(id)].num = numberOfWantedProducts;
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

    generateProductsAndFixItsWidth: (theStartedIndex,productsNumber)=>{
        Containers.generateProductsInAllContainers(theStartedIndex,productsNumber);
        Containers.changeProductsWidth(productsNumber,containerProducts());
    }
};
// class category: had the index and num atributes.
class Container{
    constructor()
    {
        this.index = 0;
        this.num = 0;
    }

    plusIndex()
    {
        this.index++;
    }

    muinsIndex()
    {
        this.index--;
    }
}

let categoriesObjects = []; // this variabel save all category objects created.


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

// generateProducts: this function take containers and number: it generate products the containers wiht the numper of repeatetion = num in all container. 
const moveRight = (containerObject,container)=>{
    let products = Containers.generate20StaticProducts();
    containerObject.plusIndex();
    let index = (containerObject.index % 20) - 1;
    index = (index < 0)? 20 + index: index;

    container.innerHTML+=products[index];
    
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

// generateProducts: this function take containers and number: it generate products the containers wiht the numper of repeatetion = num in all container. 
const moveLeft = (containerObject,container)=>{
    let products = Containers.generate20StaticProducts();
    containerObject.muinsIndex();

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
    },600)
       
}

const generateProductsAccordingWindowWidth = ()=>{
    if(window.innerWidth > 1650)
    {
        Containers.generateProductsAndFixItsWidth(7,7);
    }
    else if(window.innerWidth > 1530)
    {
        const productsNum = 6;
        Containers.generateProductsInAllContainers(6,productsNum);
        Containers.changeProductsWidth(6,containerProducts());
    }
    else if(window.innerWidth > 1200)
    {
        const productsNum = 5;
        Containers.generateProductsInAllContainers(5,productsNum);
        Containers.changeProductsWidth(5,containerProducts());
    }
    else if(window.innerWidth > 1000)
    {
        const productsNum = 4;
        Containers.generateProductsInAllContainers(4,productsNum);
        Containers.changeProductsWidth(4,containerProducts());
    }
    else if(window.innerWidth > 730)
    {
        const productsNum = 3;
        Containers.generateProductsInAllContainers(3,productsNum);
        Containers.changeProductsWidth(3,containerProducts());
    }
    else if(window.innerWidth > 455)
    {
        const productsNum = 2;
        Containers.generateProductsInAllContainers(2,productsNum);
        Containers.changeProductsWidth(2,containerProducts());
    }
    else if(window.innerWidth < 455)
    {
        const productsNum = 1;
        Containers.generateProductsInAllContainers(1,productsNum);
        Containers.changeProductsWidth(1,containerProducts());
    }

}

window.addEventListener('resize',generateProductsAccordingWindowWidth); // set the number of products when the page window resize;

generateProductsAccordingWindowWidth(); // set the number of products when page refresh;