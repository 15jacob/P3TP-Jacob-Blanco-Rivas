const { SEQUELIZE } = require('./db/db.js');
const { User, ProductItem, ProductCategory, Order, OrderProduct } = require('./models/index.js');

const seedDatabase = async () => {
    try {        
        await SEQUELIZE.sync({ force: true });

        await User.bulkCreate([
            { email: 'tomas@example.com', password: 'password123' },
            { email: 'jacob@example.com', password: 'password123' }
        ],{
            individualHooks: true
        });

        await ProductCategory.bulkCreate([
            { id: 1, name: 'Gorra' },
            { id: 2, name: 'Medias' }
        ]);

        await ProductItem.bulkCreate([
            { id: 1, id_category: 1, title: 'Gorra Negra Trucker', color: 'Negro', price: '12000', stock: 10, image_url: '/assets/img/trucker-negra.webp', attributes: { tipo: 'Trucker' }, status: true },
            { id: 2, id_category: 1, title: 'Gorra Blanca Trucker', color: 'Blanco', price: '12500', stock: 8, image_url: '/assets/img/trucker-blanca.webp', attributes: { tipo: 'Trucker' }, status: true },
            { id: 3, id_category: 1, title: 'Gorra Azul Trucker', color: 'Azul', price: '13000', stock: 6, image_url: '/assets/img/trucker-azul.webp', attributes: { tipo: 'Trucker' }, status: true },
            { id: 4, id_category: 1, title: 'Gorra Roja Snapback', color: 'Rojo', price: '11800', stock: 12, image_url: '/assets/img/snapback-roja.webp', attributes: { tipo: 'Snapback' }, status: true },
            { id: 5, id_category: 1, title: 'Gorra Azul Snapback', color: 'Azul', price: '11900', stock: 9, image_url: '/assets/img/snapback-azul.webp', attributes: { tipo: 'Snapback' }, status: true },
            { id: 6, id_category: 1, title: 'Gorra Verde Snapback', color: 'Verde', price: '12200', stock: 5, image_url: '/assets/img/snapback-verde.webp', attributes: { tipo: 'Snapback' }, status: true },
            { id: 7, id_category: 1, title: 'Gorra Negra Fitted', color: 'Negro', price: '11500', stock: 11, image_url: '/assets/img/fitted-negra.webp', attributes: { tipo: 'Fitted' }, status: true },
            { id: 8, id_category: 1, title: 'Gorra Verde Fitted', color: 'Verde', price: '13000', stock: 4, image_url: '/assets/img/fitted-verde.webp', attributes: { tipo: 'Fitted' }, status: true },
            { id: 9, id_category: 2, title: 'Media Negra Corta', color: 'Negro', price: '3500', stock: 20, image_url: '/assets/img/corta-negro.webp', attributes: { cania: 'Corta' }, status: true },
            { id: 10, id_category: 2, title: 'Media Blanca Corta', color: 'Blanco', price: '3600', stock: 18, image_url: '/assets/img/corta-blanco.webp', attributes: { cania: 'Corta' }, status: true },
            { id: 11, id_category: 2, title: 'Media Azul Corta', color: 'Azul', price: '3400', stock: 22, image_url: '/assets/img/corta-azul.webp', attributes: { cania: 'Corta' }, status: true },
            { id: 12, id_category: 2, title: 'Media Negra Media', color: 'Negro', price: '3300', stock: 25, image_url: '/assets/img/media-negra.jpg', attributes: { cania: 'Media' }, status: true },
            { id: 13, id_category: 2, title: 'Media Azul Media', color: 'Azul', price: '3400', stock: 20, image_url: '/assets/img/media-azul.webp', attributes: { cania: 'Media' }, status: true },
            { id: 14, id_category: 2, title: 'Media Verde Media', color: 'Verde', price: '3700', stock: 17, image_url: '/assets/img/media-verde.webp', attributes: { cania: 'Media' }, status: true },
            { id: 15, id_category: 2, title: 'Media Negra Larga', color: 'Negro', price: '3800', stock: 15, image_url: '/assets/img/larga-negro.webp', attributes: { cania: 'Larga' }, status: true },
            { id: 16, id_category: 2, title: 'Media Azul Larga', color: 'Azul', price: '4000', stock: 10, image_url: '/assets/img/larga-azul.webp', attributes: { cania: 'Larga' }, status: true }
        ]);

        await Order.bulkCreate([
            { id: 1, name: 'Cliente A', date: new Date('2025-11-20 10:30:00') },
            { id: 2, name: 'Cliente B', date: new Date('2025-11-20 11:45:00') },
            { id: 3, name: 'Cliente C', date: new Date('2025-11-21 14:20:00') }
        ]);

        await OrderProduct.bulkCreate([
            { quantity: 1, price: '12000', id_order: 1, id_product: 1 },
            { quantity: 2, price: '3500', id_order: 1, id_product: 9 },
            
            { quantity: 1, price: '11800', id_order: 2, id_product: 4 },
            { quantity: 3, price: '3600', id_order: 2, id_product: 10 }, 
            { quantity: 1, price: '13000', id_order: 2, id_product: 3 },
            
            { quantity: 2, price: '11500', id_order: 3, id_product: 7 },
            { quantity: 4, price: '3400', id_order: 3, id_product: 11 }
        ]);

        console.log('🎉 Base de datos inicializada correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();