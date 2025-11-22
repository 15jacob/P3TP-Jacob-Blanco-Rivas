export class CartView {
    constructor() {
        this.elementos = {
            cartItemsContainer: document.querySelector('.list-unstyled'),
            totalElement: document.querySelector('.fw-bold.fs-4'),
            finalizarBtn: document.querySelector('.btn-outline-light'),
            vaciarCarritoBtn: document.querySelector('a.text-danger'),
            contadorCarrito: document.querySelector('header .fs-4')
        };
    }

    renderizarCarrito(cart, total) {
        if (cart.length === 0) {
            this.renderizarCarritoVacio();
            return;
        }

        this.elementos.cartItemsContainer.innerHTML = cart.map(item => `
            <li class="d-flex align-items-center gap-3 py-3 border-bottom">
                <img class="rounded-2" src="${item.imagen}" alt="${item.titulo}" style="width: 110px;">
                <div class="flex-grow-1">
                    <div>
                        <span>${item.titulo}</span>
                        <span>| ${item.categoria} - ${item.atributoExtra}</span>
                        <span class="fw-bold">$${item.precio}</span>
                    </div>
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex gap-2 align-items-center mt-2">
                            <button class="btn btn-sm bg-success-subtle rounded-2 btn-decrease" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" class="bi bi-dash-lg" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"/>
                                </svg>
                            </button>
                            <span class="fw-bold fs-5">${item.cantidad}</span>
                            <button class="btn btn-sm bg-success-subtle rounded-2 btn-increase" data-id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" class="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                                </svg>
                            </button>
                        </div>
                        <button class="mt-2 btn btn-outline-danger btn-sm btn-eliminar-todo" data-id="${item.id}">
                            Eliminar
                        </button>
                    </div>
                </div>
            </li>
        `).join('');

        this.elementos.totalElement.textContent = `Total: $${total}`;
        this.elementos.finalizarBtn.disabled = false;
        this.elementos.finalizarBtn.textContent = 'Finalizar compra';
    }

    renderizarCarritoVacio() {
        this.elementos.cartItemsContainer.innerHTML = `
            <li class="text-center py-4">
                <p class="text-light">Tu carrito está vacío</p>
                <a href="./home" class="btn btn-outline-light btn-sm">Ir a comprar</a>
            </li>
        `;
        this.elementos.totalElement.textContent = 'Total: $0';
        this.elementos.finalizarBtn.disabled = true;
        this.elementos.finalizarBtn.textContent = 'Carrito vacío';
    }

    actualizarContador(cantidad) {
        if (this.elementos.contadorCarrito) {
            this.elementos.contadorCarrito.textContent = cantidad;
        }
    }

    mostrarConfirmacion(mensaje) {
        return confirm(mensaje);
    }

    mostrarAlerta(mensaje) {
        alert(mensaje);
    }
}