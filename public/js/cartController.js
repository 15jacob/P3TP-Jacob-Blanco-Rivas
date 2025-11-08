import { cartManager } from './cartManager.js';
import { CartView } from './cartView.js';

export class CartController {
    constructor() {
        this.cartManager = cartManager;
        this.view = new CartView();
        this.init();
    }

    init() {
        this.renderizarCarrito();
        this.configurarEventListeners();
    }

    renderizarCarrito() {
        const cart = this.cartManager.cart;
        const total = this.cartManager.getTotal();
        this.view.renderizarCarrito(cart, total);
        this.view.actualizarContador(this.cartManager.getCantidadProductos());
    }

    configurarEventListeners() {
        this.view.elementos.vaciarCarritoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.vaciarCarrito();
        });

        document.addEventListener('click', (e) => {
            const productId = e.target.closest('[data-id]')?.dataset.id;
            if (!productId) return;

            if (e.target.closest('.btn-eliminar-todo')) {
                this.eliminarProductoCompletamente(productId);
            }
            else if (e.target.closest('.btn-increase')) {
                this.aumentarCantidad(productId);
            }
            else if (e.target.closest('.btn-decrease')) {
                this.disminuirCantidad(productId);
            }
        });

        this.view.elementos.finalizarBtn.addEventListener('click', () => {
            this.finalizarCompra();
        });
    }

    vaciarCarrito() {
        if (this.view.mostrarConfirmacion('¿Estás seguro de que querés vaciar todo el carrito?')) {
            this.cartManager.limpiarCarrito();
            this.renderizarCarrito();
        }
    }

    eliminarProductoCompletamente(productId) {
        if (this.view.mostrarConfirmacion('¿Eliminar este producto del carrito?')) {
            this.cartManager.eliminarProductoCompletamente(productId);
            this.renderizarCarrito();
        }
    }

    aumentarCantidad(productId) {
        const item = this.cartManager.cart.find(item => String(item.id) === productId);
        if (item) {
            this.cartManager.agregarProducto(item);
            this.renderizarCarrito();
        }
    }

    disminuirCantidad(productId) {
        this.cartManager.eliminarProducto(productId);
        this.renderizarCarrito();
    }

    finalizarCompra() {
        if (this.cartManager.cart.length === 0) {
            this.view.mostrarAlerta('El carrito está vacío');
            return;
        }

        if (confirm('¿Confirmar compra?')) {
            const ticketData = {
                numeroVenta: `VTA-${Date.now()}`,
                fecha: new Date().toISOString(),
                productos: this.cartManager.cart,
                total: this.cartManager.getTotal(),
                cantidadProductos: this.cartManager.getCantidadProductos()
            };

            localStorage.setItem('ultimaVenta', JSON.stringify(ticketData));

            this.cartManager.limpiarCarrito();

            window.location.href = './ticket.html';
        }
    }
}