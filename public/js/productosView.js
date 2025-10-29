export function crearCardProducto(producto) {
    const div = document.createElement("div");
    div.classList.add("col-6", "col-md-4", "col-lg-3", "pb-3", "d-flex");

    const atributoExtra = producto.tipo ? producto.tipo : producto.cania;
    const categoria = producto.categoria || "Producto";

    // div.innerHTML = `
    //     <div class="d-flex flex-column p-3 bg-success bg-gradient rounded-4 transition-all hover-scale hover-shadow w-100">
    //         <h3 class="fs-5 text-center">${producto.titulo}</h3>
    //         <div class="pb-3 h-20 flex-shrink-0">
    //             <img class="rounded-4 w-100" src="${producto.imagen}" alt="${producto.titulo}">
    //         </div>
    //         <h3 class="fs-4">$${producto.precio}</h3>
    //         <div class="d-flex gap-1 flex-shrink-0">
    //             <p class="text-success fs-6 px-2 rounded-1 bg-success-subtle d-inline-block">${categoria}</p>
    //             <p class="text-success fs-6 px-2 rounded-1 bg-success-subtle d-inline-block">${atributoExtra}</p>
    //         </div>
            
    //         <div class="d-grid mt-auto">
    //             <button class="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center gap-1" id="btnAgregar">
    //                 <i class="bi bi-cart"></i> Agregar
    //             </button>
    //         </div>
    //     </div>
    // `;

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
                <div class="d-grid">
                    <button class="btn btn-outline-light btn-sm d-flex align-items-center justify-content-center gap-1" id="btnAgregar">
                        <i class="bi bi-cart"></i> Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
    return div;
}

export function mostrarProductos(productos, contenedor) {
    contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar las nuevas tarjetas
    productos.forEach(prod => contenedor.appendChild(crearCardProducto(prod)));
}