import { Producto } from "./producto.js";

export class Gorra extends Producto {
    tipo;

    constructor(id, titulo, color, precio, stock, imagen, tipo) {
        super(id, titulo, color, precio, stock, imagen);
        this.tipo = tipo;
        this.categoria = "Gorra"
    }
}