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

        Cart.updateCounter();
        Cart.noProductsWarning(products.length === 0);
        Cart.enableCheckout(products.length !== 0);
        Cart.updateTotal();
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

    static updateCounter()
    {
        const CART_COUNTER = document.getElementById('cart-counter');
        
        if(CART_COUNTER)
            CART_COUNTER.innerText = Cart.getAllProducts().length;
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
        const LOADING_SPINNER = document.getElementById('loading-spinner');

        if(LOADING_SPINNER)
            LOADING_SPINNER.classList.toggle('d-none', !status);
    }

    static noProductsWarning(status)
    {
        const NO_PRODUCTS_WARNING = document.getElementById('cart-no-products');

        if(NO_PRODUCTS_WARNING)
            NO_PRODUCTS_WARNING.classList.toggle('d-none', !status);
    }

    static enableCheckout(status)
    {
        const BTN_CHECKOUT = document.getElementById('btn-checkout');

        if(BTN_CHECKOUT)
            BTN_CHECKOUT.classList.toggle('disabled', !status);
    }

    static confirmOrder()
    {
        const USER = localStorage.getItem('nombreUsuario');
        const PRODUCTS = Cart.getAllProducts();

        if(USER && PRODUCTS.length > 0)
        {
            fetch('http://localhost:3000/cart/confirm-order',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                (
                    {
                        user: USER,
                        products: PRODUCTS
                    }
                )
            })
            .then(response => response.json())
            .then(function(parsedResponse)
            {
                if(parsedResponse.id_order > 0)
                {
                    localStorage.removeItem('cart');
                    localStorage.removeItem('nombreUsuario');
                    
                    location.href = `/ticket/id=${parsedResponse.id_order}`;
                }
            })
            .catch(error => console.log(error));
        }
    }
}