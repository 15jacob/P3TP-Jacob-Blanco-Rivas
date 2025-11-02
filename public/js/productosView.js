export function crearCardProducto(producto, cartManager) {
    const div = document.createElement("div");
    div.classList.add("col-6", "col-md-4", "col-lg-3", "pb-3", "d-flex");

    const atributoExtra = producto.tipo ? producto.tipo : producto.cania;
    const categoria = producto.categoria || "Producto";

    const enCarrito = cartManager.cart.find(item => item.id === producto.id);
    const cantidadEnCarrito = enCarrito ? enCarrito.cantidad : 0;

    div.innerHTML = `
        <div class="d-flex flex-column p-3 bg-success bg-gradient rounded-4 transition-all hover-scale hover-shadow w-100">
            <div class="pb-3 h-20 flex-shrink-0">
                <img class="rounded-4 w-100" src="${producto.imagen}" alt="${producto.titulo}">
            </div>
            <h3 class="fs-5">${producto.titulo}</h3>
            <div class="d-flex gap-1 flex-shrink-0">
                <p class="text-success fs-6 px-2 rounded-1 bg-success-subtle d-inline-block">${categoria}</p>
                <p class="text-success fs-6 px-2 rounded-1 bg-success-subtle d-inline-block">${atributoExtra}</p>
            </div>
            <div class="mt-auto">
                <h3 class="fs-4">$${producto.precio}</h3>
                ${cantidadEnCarrito > 0 ? `
                    <div class="d-grid mb-2">
                        <button class="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center gap-1 btn-eliminar"
                                data-id="${producto.id}">
                            <i class="bi bi-trash"></i> Eliminar (${cantidadEnCarrito})
                        </button>
                    </div>
                ` : ''}
                <div class="d-grid">
                    <button class="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center gap-1 btn-agregar" data-id="${producto.id}">
                        <i class="bi bi-cart"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
    return div;
}

export function mostrarProductos(productos, contenedor, cartManager) {
    contenedor.innerHTML = ""; 
    productos.forEach(prod => {
        const card = crearCardProducto(prod, cartManager);
        contenedor.appendChild(card);
    });
}