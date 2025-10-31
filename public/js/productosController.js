import { Gorra } from "./gorra.js";
import { Media } from "./media.js";
import { mostrarProductos } from "./productosView.js";
import { cartManager } from "./cartManager.js";

let productosLista = [];
let productosFiltrados = [];
let paginaActual = 1;
const productosPorPagina = 8;

export function initProductos() {
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
            productosFiltrados = productos;

            configurarFiltros();
            configurarPaginacion();
            mostrarPagina(paginaActual);

            setupCartEventDelegation();
            cartManager.actualizarContadorCarrito();
        })
        .catch(error => console.log(error));
}

function configurarFiltros() {
    const botonesFiltro = document.querySelectorAll('#pillNav2 .nav-link');

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');
            
            const categoria = boton.textContent.trim().toLowerCase();            
            aplicarFiltro(categoria);
            
            paginaActual = 1;
            mostrarPagina(paginaActual);
        });
    });
}

function aplicarFiltro(categoria) {
    switch(categoria) {
        case 'gorras':
            productosFiltrados = productosLista.filter(producto => producto.categoria === 'Gorra');
            break;
        case 'medias':
            productosFiltrados = productosLista.filter(producto => producto.categoria === 'Media');
            break;
        default:
            productosFiltrados = productosLista;
    }
    
    actualizarEstadoBotones();
}

function configurarPaginacion() {
    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");

    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            mostrarPagina(paginaActual);
        }
    });

    btnSiguiente.addEventListener("click", () => {
        if (paginaActual < getTotalPaginas()) {
            paginaActual++;
            mostrarPagina(paginaActual);
        }
    });
}

function mostrarPagina(numeroPagina) {
    const contenedor = document.getElementById("contenedorProductos");
    const inicio = (numeroPagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
    
    mostrarProductos(productosPagina, contenedor, cartManager);
    actualizarEstadoBotones();
    actualizarIndicadorPagina(numeroPagina);
}

function getTotalPaginas() {
    return Math.ceil(productosFiltrados.length / productosPorPagina);
}

function actualizarEstadoBotones() {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const totalPaginas = getTotalPaginas();

    if (paginaActual > totalPaginas && totalPaginas > 0) {
        paginaActual = totalPaginas;
        mostrarPagina(paginaActual);
        return;
    }
    
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual === totalPaginas;
    
    btnAnterior.classList.toggle('disabled', paginaActual === 1);
    btnSiguiente.classList.toggle('disabled', paginaActual === totalPaginas);
}

function actualizarIndicadorPagina(paginaActual) {
    const totalPaginas = getTotalPaginas();
    let indicador = document.getElementById('indicadorPagina');
    
    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'indicadorPagina';
        indicador.className = 'text-center text-success mt-2';
        document.querySelector('.row.pb-3').appendChild(indicador);
    }
    
    indicador.innerHTML = `${paginaActual} de ${totalPaginas}`;
}


function setupCartEventDelegation() {
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
            }
        }
        else if (e.target.closest('.btn-eliminar')) {
            const button = e.target.closest('.btn-eliminar');
            const productId = button.getAttribute('data-id');
            cartManager.eliminarProducto(productId);
            recargarProductos();
        }
    });
}

function recargarProductos() {
    mostrarPagina(paginaActual);
    cartManager.actualizarContadorCarrito();
}