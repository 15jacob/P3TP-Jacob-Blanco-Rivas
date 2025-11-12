import { ProductItem } from '../../models/product/item';

export async function getProducts(req, res)
{
    try
    {
        const { page } = req.params;
        const RESULTS_PER_PAGE = 10;
        const OFFSET = RESULTS_PER_PAGE * page;

        const FETCHED = await ProductItem.findAll({
            where:
            {
                status: true
            },
            include:
            {
                model: ProductCategory,
                as: 'category'
            }
        })
        .then(data => data.map(user => user.toJSON()))
        .then(data => ejs.renderFile(path.join(__dirname, 'views', 'home.ejs'), {data: data}));

        console.log(FETCHED);
        res.send(FETCHED);
    }
    catch {}
};

/* export async function createdAlquiler(req, res)
{
    try
    {
        const { codigo, idPelicula, duracion } = req.body;

        const user = await User.findOne({
            include:
            [
                {
                    model: Perfil,
                    where: { codigo },
                },
            ],
        });

        if (!user?.id)
        {
            throw new Error("Usuario no existe");
        }

        const pelicula = await Pelicula.findByPk(idPelicula);

        if (!pelicula?.id)
        {
            throw new Error("Pelicula no existe");
        }

        let fecha = new Date();

        const fechaDeRetiro = fecha.toString();

        const fechaDeDevolucion = new Date(
            fecha.setDate(fecha.getDate() + duracion)
        ).toString();

        console.log({
            user: user.id,
            pelicula: pelicula.id,
            fechaDeDevolucion,
            fechaDeRetiro,
        });

        const alquiler = await user.addPelicula(pelicula,
        {
            through: {
                fechaDeRetiro,
                fechaDeDevolucion,
            },
        });

        res.send(alquiler);
    }
    catch (error)
    {
        res.send(error);
    }
};
 */
