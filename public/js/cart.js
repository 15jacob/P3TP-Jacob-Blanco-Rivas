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

    static async addProduct(that)
    {
        const PRODUCTS = Cart.getAllProducts();
        const PRODUCT_ON_CART = PRODUCTS.find(product => product.id === that.id);

        if (PRODUCT_ON_CART)
            PRODUCT_ON_CART.quantity++;
        else
        {
            PRODUCTS.push(
                {
                    id: that.id,
                    price: that.price,
                    quantity: 1 
                }
            );
        }

        Cart.saveProducts(PRODUCTS);
    }

    static async deleteProduct(id)
    {
        let quantity = 0;

        Cart.saveProducts(
            Cart.getAllProducts().filter(function(product)
            {
                if(product.id == id)
                {
                    if(product.quantity > 1)
                    {
                        product.quantity--;
                        quantity = product.quantity;
                        return product;
                    }
                    else
                        Cart.removeProduct(id);
                }
                else
                    return product;
            })
        );

        return quantity;
    }

    static removeProduct(id)
    {
        const ID = String(id);
        const PRODUCTS = Cart.getAllProducts().filter(product => String(product.id) !== ID);

        if(PRODUCTS.length === 0)
            Cart.noProductsWarning(true);

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
        document.getElementById('cart-counter').textContent = productQuantity;
    }

    static updateTotal()
    {
        const CART_TOTAL = document.getElementById('cart-total');

        if(CART_TOTAL)
        {
            CART_TOTAL.classList.remove('d-none');
            CART_TOTAL.innerText = `Total: $${Cart.getTotal()}`;
        }
    }
    
    static spinner(status)
    {
        document.getElementById('loading-spinner').classList.toggle('d-none', !status);
    }

    static noProductsWarning(status)
    {
        document.getElementById('cart-no-products').classList.toggle('d-none', !status);
    }

    static enableCheckout(status)
    {
        document.getElementById('btn-checkout').classList.toggle('disabled', !status);
    }
}