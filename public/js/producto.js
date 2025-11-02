export class Producto {
    id;
    titulo;
    color;
    precio;
    stock;
    imagen;

    constructor(id, titulo, color, precio, stock, imagen) {
        this.id = id;
        this.titulo = titulo;
        this.color = color;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
}