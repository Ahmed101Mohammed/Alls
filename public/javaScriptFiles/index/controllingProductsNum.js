// In this file the scripting determines the number of products in the Categories parts.

// class category: had the index and num atributes.
class category{
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

// indexsTarget: this function give me the indexs of the pruducts thats will be view.
const indexsTarget = (index,num)=>{
    let start = (index % 20) -1;

    if (start < 0)
    {
        start = 20 + start;
    }

    let indexs = [];
    for(let i = 0; i < num; i++)
    {
        start = (start >= 0)? start:20 + start;
        indexs.push(start);
        start--;
    }
    return indexs;
}

// repeateProducts: this function take num and element: it and the copies of this elemet to the original element and return it.
const repeateProducts = ()=>{
    let elements = [];

    for(let i = 0; i < 20; i++)
    {
        elements.push(`
                            <!-- product card -->
                            <div class="product">

                                <!-- product photo -->
                                <div class="photo">
                                    <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" alt="canone camera">
                                </div>

                                <!-- product details -->
                                <div class="details">
                                    <!-- product title -->
                                    <h3 class="title">product title${i+1}</h3>

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
                        `);
    }

    return elements;
}

// generateProducts: this function take containers and number: it generate products the containers wiht the numper of repeatetion = num in all container. 
const generateProducts = (index,num,containers)=>{

    
    let products = repeateProducts();
    let indexs = indexsTarget(index,num);
    //console.log({products,indexs,containers});
    for(let i of containers)
    {
        let id = i.parentElement.id;
        categoriesObjects[Number(id)] = new category();
        categoriesObjects[Number(id)].index = index;
        categoriesObjects[Number(id)].num = num;
        i.innerHTML = '';
        for(let j = indexs.length-1 ; j > -1; j--)
        {
            i.innerHTML += products[indexs[j]];
        }
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
// generateProducts: this function take containers and number: it generate products the containers wiht the numper of repeatetion = num in all container. 
const moveRight = (containerObject,container)=>{
    let products = repeateProducts();
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
    let products = repeateProducts();
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
// changeProductsWidth: this function take num and all products and resize the width of products to equal : 100%/n;
const changeProductsWidth = (num, products)=>{
    for(let i of products)
    {
        i.style.width = `${100 / num}%`;
    }
}
const reViewProduct = ()=>{
    if(window.innerWidth > 1650)
    {
        const productsNum = 7;
        generateProducts(productsNum,7,productsContainers());
        changeProductsWidth(7,containerProducts());
    }
    else if(window.innerWidth > 1530)
    {
        const productsNum = 6;
        generateProducts(productsNum,6,productsContainers());
        changeProductsWidth(6,containerProducts());
    }
    else if(window.innerWidth > 1200)
    {
        const productsNum = 5;
        generateProducts(productsNum,5,productsContainers());
        changeProductsWidth(5,containerProducts());
    }
    else if(window.innerWidth > 1000)
    {
        const productsNum = 4;
        generateProducts(productsNum,4,productsContainers());
        changeProductsWidth(4,containerProducts());
    }
    else if(window.innerWidth > 730)
    {
        const productsNum = 3;
        generateProducts(productsNum,3,productsContainers());
        changeProductsWidth(3,containerProducts());
    }
    else if(window.innerWidth > 455)
    {
        const productsNum = 2;
        generateProducts(productsNum,2,productsContainers());
        changeProductsWidth(2,containerProducts());
    }
    else if(window.innerWidth < 455)
    {
        const productsNum = 1;
        generateProducts(productsNum,1,productsContainers());
        changeProductsWidth(1,containerProducts());
    }

}

window.addEventListener('resize',reViewProduct); // set the number of products when the page window resize;

reViewProduct(); // set the number of products when page refresh;