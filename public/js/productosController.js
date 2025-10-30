import { Gorra } from "./gorra.js";
import { Media } from "./media.js";
import { mostrarProductos } from "./productosView.js";

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

            mostrarProductos(productos, contenedor);
        })
        .catch(error => console.log(error));
}