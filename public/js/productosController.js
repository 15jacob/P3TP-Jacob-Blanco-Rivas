import { Gorra } from "./gorra.js";
import { Media } from "./media.js";
import { mostrarProductos } from "./productosView.js";
import { cartManager } from "./cartManager.js";

let productosLista = [];

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

            mostrarProductos(productos, contenedor, cartManager);
            setupCartEventDelegation(productosLista, cartManager);
            cartManager.actualizarContadorCarrito();
        })
        .catch(error => console.log(error));
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
            cartManager.eliminarProducto(productId);
            recargarProductos();
        }
    });
}

function recargarProductos() {
    const contenedor = document.getElementById("contenedorProductos");
    mostrarProductos(productosLista, contenedor, cartManager);
    cartManager.actualizarContadorCarrito();
}