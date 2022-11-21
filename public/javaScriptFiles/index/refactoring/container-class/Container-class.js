class container {
    #numberOfMostRatingProducts;
    #mostRatingProducts;
    #viewProducts;
    #catogoryObjectOfTheContainer;

    constructor(numberOfProducts, categoryOfTheContainer)
    {
        this.#numberOfMostRatingProducts = numberOfProducts;
        this.#catogoryObjectOfTheContainer = categoryOfTheContainer;
    }
}