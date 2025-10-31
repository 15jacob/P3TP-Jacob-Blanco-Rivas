import { Gorra } from "./gorra.js";
import { Media } from "./media.js";
import { mostrarProductos } from "./productosView.js";
import { cartManager } from "./cartManager.js";

let productosLista = [];
let paginaActual = 1;
const productosPorPagina = 8;

export function initProductos() {
    const contenedor = document.getElementById("contenedorProductos");

    fetch("/assets/db/productos.json")
        .then(response => response.json())
        .then(data => {
            const productos = data.map(prod => {
                if (prod.tipo) {
                    return new Gorra(prod.id, prod.titulo, prod.color, prod.precio, prod.stock, prod.imagen, prod.tipo);
                } else if (prod.cania) {
                    return new Media(prod.id, prod.titulo, prod.color, prod.precio, prod.stock, prod.imagen, prod.cania);
                }   
            });

            productosLista = productos;

            configurarPaginacion(productosLista);
            mostrarPagina(paginaActual);

            // mostrarProductos(productos, contenedor, cartManager);
            setupCartEventDelegation(productosLista, cartManager);
            cartManager.actualizarContadorCarrito();
        })
        .catch(error => console.log(error));
}

function configurarPaginacion(productos) {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPagina(paginaActual);
            actualizarEstadoBotones(totalPaginas);
        }
    });

    btnSiguiente.addEventListener("click", () => {
        if (paginaActual < totalPaginas) {
            paginaActual++;
            mostrarPagina(paginaActual);
            actualizarEstadoBotones(totalPaginas);
        }
    });

    actualizarEstadoBotones(totalPaginas);
}

function mostrarPagina(numeroPagina) {
    const contenedor = document.getElementById("contenedorProductos");
    const inicio = (numeroPagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosLista.slice(inicio, fin);
    
    mostrarProductos(productosPagina, contenedor, cartManager);
    
    // Actualizar indicador de página (opcional)
    actualizarIndicadorPagina(numeroPagina);
}

function actualizarEstadoBotones(totalPaginas) {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    
    // Deshabilitar botones cuando corresponda
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual === totalPaginas;
    
    // Cambiar estilos visuales
    if (paginaActual === 1) {
        btnAnterior.classList.add('disabled');
    } else {
        btnAnterior.classList.remove('disabled');
    }
    
    if (paginaActual === totalPaginas) {
        btnSiguiente.classList.add('disabled');
    } else {
        btnSiguiente.classList.remove('disabled');
    }
}

function actualizarIndicadorPagina(paginaActual) {
    // Opcional: Mostrar indicador de página actual
    const totalPaginas = Math.ceil(productosLista.length / productosPorPagina);
    let indicador = document.getElementById('indicadorPagina');
    
    if (!indicador) {
        // Crear indicador si no existe
        indicador = document.createElement('div');
        indicador.id = 'indicadorPagina';
        indicador.className = 'text-center text-success mt-2';
        document.querySelector('.row.pb-3').appendChild(indicador);
    }
    
    indicador.textContent = `${paginaActual} de ${totalPaginas}`;
}


function setupCartEventDelegation(productosLista, cartManager) {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-agregar')) {
            const button = e.target.closest('.btn-agregar');
            const productId = button.getAttribute('data-id');
            
            const producto = productosLista.find(p => p.id == productId);
            
            if (producto) {
                const productData = {
                    id: producto.id,
                    titulo: producto.titulo,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    categoria: producto.categoria,
                    atributoExtra: producto.tipo || producto.cania || ""
                };
                
                cartManager.agregarProducto(productData);
                recargarProductos();
                
                button.innerHTML = '<i class="bi bi-check"></i> Agregado';
                button.disabled = true;
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-cart"></i> Agregar';
                    button.disabled = false;
                }, 500);
            }
        }
        else if (e.target.closest('.btn-eliminar')) {
            const button = e.target.closest('.btn-eliminar');
            const productId = button.getAttribute('data-id');
            console.log('🔄 BOTÓN ELIMINAR - Producto ID:', productId);
            console.log('Carrito ANTES de eliminar:', cartManager.cart)
            cartManager.eliminarProducto(productId);
            console.log('Carrito DESPUÉS de eliminar:', cartManager.cart);
            recargarProductos();
        }
        else {
            console.log('❌ Click en elemento no manejado');
        }
    });
}

function recargarProductos() {
    mostrarPagina(paginaActual);
    cartManager.actualizarContadorCarrito();
}