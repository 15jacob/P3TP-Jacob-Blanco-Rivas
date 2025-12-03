import { Cart } from "./cart.js";

export class Product
{
    constructor({id, price})
    {
        this.id = id;
        this.price = price;

        Product.inCart(id, Cart.getProduct(id) !== false);
    }

    async addProductCart()
    {
        const THIS = this;

        await Cart.addProduct(THIS)
        .then(function()
        {
            Product.inCart(THIS.id, true);
            Cart.updateTotal();
        });
    }

    async deleteProductCart()
    {
        const THIS = this;

        Cart.deleteProduct(THIS.id)
        .then(function(quantity)
        {
            Product.inCart(THIS.id, quantity > 0);
            Cart.updateTotal();
        });
    }

    removeProductCart()
    {
        Cart.removeProduct(this.id);
        Product.inCart(this.id, false);
        Cart.updateTotal();
    }

    static getProductCard(id)
    {
        return document.querySelector(`.product-card[data-id="${id}"]`);
    }

    static inCart(id, status)
    {
        const PRODUCT_CARD = Product.getProductCard(id);

        if(PRODUCT_CARD)
        {
            const ADD_CONTAINER = PRODUCT_CARD.querySelector(`.add-container`);
            const DELETE_CONTAINER = PRODUCT_CARD.querySelector(`.delete-container`);
            const SPAN_QUANTITY = PRODUCT_CARD.querySelector('span.quantity');
            const SPAN_SUBTOTAL_PRICE = PRODUCT_CARD.querySelector('span.subtotal-price');

            const PRODUCT = Cart.getProduct(id);
            const SUBTOTAL_PRICE = parseInt(PRODUCT.quantity) * parseInt(PRODUCT.price);

            SPAN_QUANTITY.textContent = PRODUCT.quantity;

            if(SPAN_SUBTOTAL_PRICE && SUBTOTAL_PRICE > 0)
                SPAN_SUBTOTAL_PRICE.textContent = `$${SUBTOTAL_PRICE}`;

            if(!SUBTOTAL_PRICE && PRODUCT_CARD.dataset.cart == 'true')
                PRODUCT_CARD.classList.add('fade-out');

            if(ADD_CONTAINER && DELETE_CONTAINER)
            {
                if(status === true)
                {
                    DELETE_CONTAINER.classList.remove('d-none');
                    ADD_CONTAINER.classList.add('d-none');
                }
                else
                {
                    DELETE_CONTAINER.classList.add('d-none');
                    ADD_CONTAINER.classList.remove('d-none');
                }
            }
        }
    }
}