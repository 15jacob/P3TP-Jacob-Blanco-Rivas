import { ProductItem, ProductCategory, Order } from '../models/index.js';
import { uint } from '../public/js/misc.js';

export async function getHomePage(req, res)
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

        let id_category = 0;

        if(req.params.id)
        {
            id_category = uint(req.params.id);

            if(id_category > 0)
                query.where.id_category = id_category;
        }

        const { count : COUNT_PRODUCTS, rows : PRODUCTS } = await ProductItem.findAndCountAll(query);
        const CATEGORIES = await ProductCategory.findAll();

        res.render('home.ejs',
        {
            products: PRODUCTS,
            categories: CATEGORIES,
            params:
            {
                page: PAGE + 1,
                id_category: id_category,
                total_pages: Math.ceil(COUNT_PRODUCTS / RESULTS_PER_PAGE)
            }
        });
    }
    catch (error)
    {
        console.error('ERROR: ', error);
        res.status(500).send('ERROR: ' + error);
    }
};