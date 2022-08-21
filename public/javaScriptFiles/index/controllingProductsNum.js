// In this file the scripting determines the number of products in the Categories parts.

// repeateProducts: this function take num and element: it and the copies of this elemet to the original element and return it.
const repeateProducts = (num,e)=>{

    let elements = '';

    for(let i = 0; i < num; i++)
    {
        elements += e;
    }

    return elements
}

// generateProducts: this function take containers and number: it generate products the containers wiht the numper of repeatetion = num in all container. 
const generateProducts = (num,containers)=>{

    let product = `
                    <!-- product card -->
                    <div class="product">

                        <!-- product photo -->
                        <div class="photo">
                            <img src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg" alt="canone camera">
                        </div>

                        <!-- product details -->
                        <div class="details">
                            <!-- product title -->
                            <h3 class="title">product title</h3>

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
    let products = repeateProducts(num,product);

    for(let i of containers)
    {
        i.innerHTML = '';
        i.innerHTML += products;
    }
        
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
        generateProducts(7,productsContainers());
        changeProductsWidth(7,containerProducts());
    }
    else if(window.innerWidth > 1530)
    {
        generateProducts(6,productsContainers());
        changeProductsWidth(6,containerProducts());
    }
    else if(window.innerWidth > 1200)
    {
        generateProducts(5,productsContainers());
        changeProductsWidth(5,containerProducts());
    }
    else if(window.innerWidth > 1000)
    {
        generateProducts(4,productsContainers());
        changeProductsWidth(4,containerProducts());
    }
    else if(window.innerWidth > 730)
    {
        generateProducts(3,productsContainers());
        changeProductsWidth(3,containerProducts());
    }
    else if(window.innerWidth > 455)
    {
        generateProducts(2,productsContainers());
        changeProductsWidth(2,containerProducts());
    }
    else if(window.innerWidth < 455)
    {
        generateProducts(1,productsContainers());
        changeProductsWidth(1,containerProducts());
    }

}

window.addEventListener('resize',reViewProduct); // set the number of products when the page window resize;

reViewProduct(); // set the number of products when page refresh;