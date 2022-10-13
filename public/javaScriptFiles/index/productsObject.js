export const Products = {
    Math: {
        getNumberFrom0To20: (theNumber)=>{
            let number = theNumber % 20;
            
            if(number < 0)
            {
                number += 20;
            }
    
            return number;
        },
    },

    allProducts: ()=> document.querySelectorAll('div.category div.container div.product'),
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
    },   

    getIndexsOfTargetProducts: (TheStartedIndex,numOfWantedProducts)=>{

        TheStartedIndex = Products.Math.getNumberFrom0To20(TheStartedIndex - 1);

        let indexsOfWantedProducts = [];

        for(let productNumber = 0; productNumber < numOfWantedProducts; productNumber++)
        {
            TheStartedIndex = Products.Math.getNumberFrom0To20(TheStartedIndex);
    
            indexsOfWantedProducts.push(TheStartedIndex);
    
            TheStartedIndex--;
        }

        return indexsOfWantedProducts;
    },

    generate20StaticProducts: ()=>{
        let products = [];
    
        for(let productNumber = 0; productNumber < 20; productNumber++)
        {
            products.push(Products.generateProduct(productNumber + 1));
        }
    
        return products;
    },

    changeProductsWidthAcordingProductsNumper: (productsNumber)=>{
        let products = Products.allProducts();
        for(let product of products)
        {
            product.style.width = `${100 / productsNumber}%`;
        }
    },

    getNumberedProductAccordingIndexFrom0To19: (TheIndexOfTheProduct)=>{
        let product = Products.generate20StaticProducts();
        let targetProduct = product[TheIndexOfTheProduct];

        return targetProduct;
    },
}