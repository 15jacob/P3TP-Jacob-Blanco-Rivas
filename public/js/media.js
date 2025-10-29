import { Producto } from "./producto.js";

export class Media extends Producto {
    cania;

    constructor(id, titulo, color, precio, stock, imagen, cania) {
        super(id, titulo, color, precio, stock, imagen);
        this.cania = cania;
        this.categoria = "Media"
    }
}