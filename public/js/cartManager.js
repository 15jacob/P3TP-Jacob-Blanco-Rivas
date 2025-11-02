class CartManager {
    constructor() {
        this.cart = this.cargarCarrito();
    }

    cargarCarrito() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    guardarCarrito() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.actualizarContadorCarrito();
    }

    agregarProducto(producto) {
        const productoExistente = this.cart.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            this.cart.push({ ...producto, cantidad: 1 });
        }


        this.guardarCarrito();
    }

    eliminarProducto(id) {
        const idString = String(id);
        const producto = this.cart.find(item => String(item.id) === idString);

        if (producto) {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                this.cart = this.cart.filter(item => String(item.id) !== idString);
            }
            this.guardarCarrito();
        }
    }


    eliminarProductoCompletamente(id) {
        const idString = String(id);
        this.cart = this.cart.filter(item => String(item.id) !== idString);
        this.guardarCarrito();
    }

    limpiarCarrito() {
        this.cart = [];
        this.guardarCarrito();
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

    getCantidadProductos() {
        return this.cart.reduce((total, item) => total + item.cantidad, 0);
    }

    actualizarContadorCarrito() {
        const contador = document.getElementById('contadorCarrito');
        if(contador) {
            contador.textContent = this.getCantidadProductos();
        }
    }
}

export const cartManager = new CartManager();