
import { Cart } from "./cart.js";
import { Product } from "./product.js";

window.addEventListener('load', function()
{
    initNavLinks();
    initPageSelectors();
    initProductEvents();
    initCartPreview();
    initCartButtons();
});

function initNavLinks()
{
    document.querySelectorAll('.nav-link').forEach(function(navLink)
    {
        navLink.addEventListener('click', function()
        {
            const IDCATEGORY = parseInt(this.dataset.id);

            if(IDCATEGORY > 0)
                window.location.href = `/home/id=${IDCATEGORY.toString()}/page=0`;
            else
                window.location.href = `/home`;
        });
    }); 
}

function initPageSelectors()
{
    document.querySelectorAll('.page-select').forEach(function(pageSelect)
    {
        pageSelect.addEventListener('click', function()
        {
            const IDCATEGORY = parseInt(this.dataset.idCategory);
            const PAGE = parseInt(this.dataset.page);

            if(IDCATEGORY === 0 && PAGE === 1)
                window.location.href = `/home`;
            else
                window.location.href = `/home/id=${IDCATEGORY.toString()}/page=${PAGE.toString()}`;
        });
    });
}

function initProductEvents()
{
    document.querySelectorAll('.product-card').forEach(function(product)
    {
        const PRODUCT = new Product(
            {
                id: product.dataset.id,
                price: product.dataset.price
            }
        );

        product.querySelectorAll('.btn-add').forEach(btn => btn.addEventListener('click', () => PRODUCT.addProductCart()));
        product.querySelector('.btn-delete').addEventListener('click', () => PRODUCT.deleteProductCart());
    });
}

//Inicializar vista previa de cart.ejs
function initCartPreview()
{
    const CART_CONTAINER = document.querySelector('#cart-container');
    const CART_PRODUCTS = Cart.getAllProducts();

    //De estar en cart.ejs y contener productos en el carrito, procedemos a fetchear la informacion necesaria de los mismos
    if(CART_CONTAINER)
    {
        if(CART_PRODUCTS.length > 0)
        {
            Cart.spinner(true);

            fetch('http://localhost:3000/cart/products',
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify
                (
                    {
                        ids: CART_PRODUCTS.map(product => product.id)
                    }
                )
            })
            .then(response => response.json())
            .then(function(parsedResponse)
            {
                Cart.spinner(false);
                const PRODUCTS = parsedResponse.products;

                for(let i = 0; i < PRODUCTS.length; i++)
                {
                    const QUANTITY = CART_PRODUCTS.filter(product => product.id == PRODUCTS[i].id)[0].quantity;
                    CART_CONTAINER.append(insertCartProduct(PRODUCTS[i], QUANTITY));
                }

                Cart.updateTotal();
                Cart.enableCheckout(true);
            });
        }
        else
            Cart.noProductsWarning(true);
    }
}

function insertCartProduct(product, quantity)
{
    const DOM_PARSER = new DOMParser();
    const HTML_STRING = `  
        <div class="product-card row p-3 bg-success rounded-3 mb-2" data-id="${product.id}" data-price="${product.price}" data-cart="true">
            <div class="col-9 col-md-4 d-flex flex-wrap justify-content-center p-0">
                <img class="img-fluid block rounded-3 w-100" src="${product.image_url}" alt="${product.title}">
            </div>

            <div class="col-12 col-md-8 mt-3 mt-md-0">
                <h3 class="title">${product.title}</h3>

                <div class="d-flex gap-1 flex-shrink-0 mb-2">
                    <span class="text-success fs-6 px-2 rounded-1 bg-success-subtle d-inline-block">${product.category.name}</span>
                </div>

                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-auto d-flex justify-content-center align-items-center">
                        <span class="mx-10 price fs-5">$${product.price}</span>
                    </div>

                    <div class="col-auto d-flex align-items-center justify-content-center">
                        <button class="btn btn-dark btn-delete">
                            <i class="bi bi-dash"></i>
                        </button>
                    </div>

                    <div class="col d-flex align-items-center justify-content-center">
                        <span class="mx-10 quantity">${quantity}</span>
                    </div>

                    <div class="col-auto d-flex align-items-center justify-content-center">
                        <button class="btn btn-dark btn-add">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>

                    <div class="col-auto d-flex align-items-center justify-content-center">
                        <span class="mx-10 fs-5">=</span>
                    </div>

                    <div class="col-auto d-flex align-items-center justify-content-center">
                        <span class="mx-10 subtotal-price fs-5">$${product.price * quantity}</span>
                    </div>
                </div>
            </div>
        </div>`;

    const PRODUCT_CARD = DOM_PARSER.parseFromString(HTML_STRING, 'text/html').body.firstChild;

    const PRODUCT = new Product(
        {
            id: product.id.toString(),
            price: product.price.toString()
        }
    );

    PRODUCT_CARD.querySelector('.btn-add').addEventListener('click', () => PRODUCT.addProductCart());
    PRODUCT_CARD.querySelector('.btn-delete').addEventListener('click', () => PRODUCT.deleteProductCart());

    return PRODUCT_CARD;
}

function initCartButtons()
{
    document.getElementById('btn-home').addEventListener('click', () => location.href = '/home');
    document.getElementById('btn-checkout').addEventListener('click', () => location.href = '/ticket');
}