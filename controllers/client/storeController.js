import { ProductItem, ProductCategory, Order, OrderProduct } from '../../models/index.js';
import { uint } from '../../public/js/misc.js';
import puppeteer from 'puppeteer';

export async function viewLogin(req, res)
{
    res.render('index.ejs');
}

export async function viewHome(req, res)
{
    try
    {
        const PAGE = uint(req.params.page - 1);
        const RESULTS_PER_PAGE = 12;
        const OFFSET = RESULTS_PER_PAGE * PAGE;

        let query =
        {
            include:
            {
                model: ProductCategory,
                as: 'category',
            },
            where:
            {
                status: 1
            },
            limit: RESULTS_PER_PAGE,
            offset: OFFSET,
        }

        let id_category = uint(req.params.id);

        if(id_category > 0)
            query.where.id_category = id_category;

        const { count : COUNT_PRODUCTS, rows : PRODUCTS } = await ProductItem.findAndCountAll(query);
        const CATEGORIES = await ProductCategory.findAll();

        res.render('home.ejs',
        {
            products: PRODUCTS,
            categories: CATEGORIES,
            params:
            {
                page: PAGE + 1,
                total_pages: Math.ceil(COUNT_PRODUCTS / RESULTS_PER_PAGE),
                id_category: id_category,
            }
        });
    }
    catch (error)
    {
        console.error('ERROR: ', error);
        res.status(500).send('ERROR: ' + error);
    }
}

export async function viewCart(req, res)
{
    //Dado que los productos se van cargando en un espacio de localstorage, el renderizado queda delegaod al lado cliente
    res.render('cart.ejs')
}

export async function getCartProducts(req, res)
{
    try
    {
        let query = 
        {
            include:
            [
                {
                    model: ProductCategory,
                    as: 'category'
                }
            ],
            where:
            {
                status: 1
            }
        }

        const IDS = req.body.ids.filter(id => parseInt(id));

        if(IDS.length > 0)
            query.where.id = IDS;

        const PRODUCTS = await ProductItem.findAll(query);

        res.json(
        {
            products: PRODUCTS,
        });
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
}

export async function createOrder(req, res)
{
    try
    {
        if(req.body.user && req.body.products.length > 0)
        {
            await Order.create(
                {
                    name: req.body.user,
                    date: Date.now()
                }
            )
            .then(function(order)
                {
                    for (let i = 0; i < req.body.products.length; i++)
                    {
                        const PRODUCT = req.body.products[i];

                        if(PRODUCT.id && PRODUCT.quantity && PRODUCT.price)
                        {
                            OrderProduct.create(
                                {
                                    quantity: PRODUCT.quantity,
                                    price: PRODUCT.price,
                                    id_product: PRODUCT.id,
                                    id_order: order.id,
                                }
                            );
                        }
                    }

                    res.status(201).json({ id_order: order.id });
                }
            )
        }
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }

    res.status(201).json({ id_order: 0 });
}



export async function viewTicket(req, res)
{
    try
    {
        const ORDER = await Order.findByPk(req.params.id, {            
            include: [                
                {
                    model: OrderProduct,
                    as: 'orderProducts',
                    include:
                    {
                        model: ProductItem,
                        as: 'product',
                        include:
                        {
                            model: ProductCategory,
                            as: 'category'
                        }
                    }
                }
            ], 
        });

        res.render('ticket.ejs',
        {
            order: ORDER,
        });
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
}

export async function downloadTicket(req, res)
{
    const BROWSER = await puppeteer.launch({ headless: true });
    const PAGE = await BROWSER.newPage();

    await PAGE.setContent(ticket()); 

    const PDF_BUFFER = await PAGE.pdf(
        {
            format: "A4",
            printBackground: true,
            margin:
            {
                top: "20px",
                bottom: "20px",
                right: "20px",
                left: "20px",
            },
            headerTemplate: "<h1>Descarga</h1>",
            footerTemplate: "<h1>Footer</h1>",
        }
    );

    await BROWSER.close();

    res.set({
        "Content-Type": "Application/pdf",
        "Content-Disposition": `attachment; filename="ticket100.pdf"`,
    });

    res.send(PDF_BUFFER);
}

function ticket()
{
    //Idealmente aca fetcheariamos la data de una orden por su ID

    const HTML_STRING = `  
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div id="ticketContent" class="text-dark rounded-3 p-4 shadow">
                    <div class="text-center mb-4">
                        <img src="assets/img/favicon.svg" alt="Cap&Sock" class="mb-3" width="60" style="filter: invert(44%) sepia(98%) saturate(391%) hue-rotate(85deg) brightness(95%) contrast(87%);">
                        <h4 class="text-success mb-1">Cap&Sock</h4>
                    </div>

                    <div class="mb-3 text-muted">
                        <div class="d-flex justify-content-between border-bottom pb-1">
                            <span class="text-muted">Ticket N°:</span>
                            <span class="fw-bold" id="ticketNumber">-</span>
                        </div>
                        <div class="d-flex justify-content-between border-bottom pb-1">
                            <span class="text-muted">Fecha:</span>
                            <span id="ticketDate">-</span>
                        </div>
                        <div class="d-flex justify-content-between border-bottom pb-1">
                            <span class="text-muted">Cliente:</span>
                            <span id="ticketClient">-</span>
                        </div>
                    </div>

                    <hr class="my-3">

                    <div class="mb-2">
                        <h6 class="text-center mb-2 text-muted fw-bold">PRODUCTOS</h6>
                        
                        <div class="d-flex justify-content-between small fw-bold text-muted mb-1">
                            <span class="w-50">Producto</span>
                            <span class="text-center" style="width: 40px;">Cant</span>
                            <span class="text-end" style="width: 60px;">Precio</span>
                            <span class="text-end" style="width: 60px;">Total</span>
                        </div>

                        <div id="ticketProducts" class="small">
                            <!-- Aquí se cargan los productos -->
                        </div>
                    </div>

                    <hr class="my-3">

                    <div class="text-end text-muted ">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold fs-5">TOTAL:</span>
                            <span class="fw-bold fs-5 text-success" id="ticketTotal">$0</span>
                        </div>
                    </div>

                    <div class="text-center mt-4 pt-3 border-top">
                        <p class="text-muted small mb-1">¡Gracias por tu compra!</p>
                        <p class="text-muted small">Conserva este ticket como comprobante</p>
                    </div>
                </div>
            </div>
        </div>`;

    return HTML_STRING;
}
