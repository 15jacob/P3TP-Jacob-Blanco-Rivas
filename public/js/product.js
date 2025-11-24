import { Cart } from "./cart.js";

export class Product
{
    constructor({id, price})
    {
        this.id = id;
        this.price = price;

        Product.inCart(id, Cart.getProduct(id) !== false);
    }

    addProductCart()
    {
        Cart.addProduct(this);
        Product.inCart(this.id, true);
    }

    deleteProductCart()
    {
        Cart.deleteProduct(this.id);
        Product.inCart(this.id, false);
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
            const ADD = PRODUCT_CARD.querySelector(`.add-container`);
            const DELETE = PRODUCT_CARD.querySelector(`.delete-container`);

            if(status === true)
            {
                DELETE.classList.remove('d-none');
                ADD.classList.add('d-none');
            }
            else
            {
                DELETE.classList.add('d-none');
                ADD.classList.remove('d-none');
            }
        }
    }
}