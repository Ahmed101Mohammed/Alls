class Category {
    #id;
    #products;
    #container;

    constructor(id, products)
    {
        this.#id = id;
        this.#products = products;
        this.#container = new Container()
    }
}