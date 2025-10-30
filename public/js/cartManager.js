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
        this.cart = this.cart.filter(item => item.id !== id);
        this.guardarCarrito();
    }

    actualizarCantidad(id, cantidad) {
        const producto = this.cart.find(item => item.id === id);
        if (producto) {
            if(cantidad <= 0) {
                this.eliminarProducto(id);
            } else {
                producto.cantidad = cantidad;
                this.guardarCarrito();
            }
        }
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