
import { Cart } from "./cart.js";
import { Product } from "./product.js";

window.addEventListener('load', function()
{
    initNavLinks();
    initPageSelectors();
    initProductEvents();
    initCartPreview();
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
    const PRODUCTS = Cart.getAllProducts();

    //De estar en cart.ejs y contener productos en el carrito, procedemos a fetchear la informacion necesaria de los mismos
    if(CART_CONTAINER && PRODUCTS.length > 0)
    {
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
                    ids: PRODUCTS.map(product => product.id)
                }
            )
        })
        .then(response => response.json())
        .then(function(parsedResponse)
        {
            const PRODUCTS = parsedResponse.products;

            for(let i = 0; i < PRODUCTS.length; i++)
            {
                CART_CONTAINER.append(insertCartProduct(PRODUCTS[i]));
            }
        });
    }
}

function insertCartProduct(product)
{
    let productCard = document.createElement('div');
    productCard.classList = 'product-card';
    productCard.innerText = product.title;

    return productCard;
}