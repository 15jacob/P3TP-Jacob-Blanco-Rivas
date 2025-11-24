export class Cart
{
    constructor()
    {
    }

    static getAllProducts()
    {
        const CART = localStorage.getItem('cart');
        return CART ? JSON.parse(CART) : [];
    }

    static getProduct(id)
    {
        return Cart.getAllProducts().filter(product => product.id === id)[0] ?? false;
    }

    static saveProducts(products)
    {
        localStorage.setItem('cart', JSON.stringify(products));
        Cart.updateCounter(products.length);
    }

    static addProduct(product)
    {
        const PRODUCTS = Cart.getAllProducts();
        const PRODUCT_ON_CART = PRODUCTS.find(product => product.id === product.id);

        if (PRODUCT_ON_CART)
            PRODUCT_ON_CART.quantity++;
        else
        {
            PRODUCTS.push(
                {
                    id: product.id,
                    price: product.price,
                    quantity: 1 
                }
            );
        }

        Cart.saveProducts(PRODUCTS);
    }

    static deleteProduct(id)
    {
        const ID = String(id);
        const PRODUCTS = Cart.getAllProducts();
        const PRODUCT = PRODUCTS.find(product => String(product.id) === ID);

        if(PRODUCT)
        {
            if(PRODUCT.quantity > 1)
                PRODUCT.quantity--;
            else
                PRODUCTS = Cart.getAllProducts().filter(product => String(product.id) !== ID);

            Cart.saveProducts(PRODUCTS);
        }
    }

    static removeProduct(id)
    {
        const ID = String(id);
        const PRODUCTS = Cart.getAllProducts().filter(product => String(product.id) !== ID);

        Cart.saveProducts(PRODUCTS);
    }

    static removeAllProducts()
    {
        Cart.saveProducts([]);
    }

    static getTotal()
    {
        return Cart.getAllProducts().reduce((total, product) => total + (product.price * product.quantity), 0);
    }

    static getCantidadProductos()
    {
        return Cart.getAllProducts().reduce((total, product) => total + product.quantity, 0);
    }

    static updateCounter(productQuantity)
    {
        const CART_COUNTER = document.getElementById('cart-counter');

        if(CART_COUNTER)
            CART_COUNTER.textContent = productQuantity;
    }
}