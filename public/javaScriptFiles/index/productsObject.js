const Products = {
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
    }
}