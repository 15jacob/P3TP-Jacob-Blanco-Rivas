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

    toJsonString() {
        return JSON.stringify(this);
    }

    static createFromJsonString(json){
        const jsonParsed = JSON.parse(json);

        return new Producto(
            jsonParsed.id,
            jsonParsed.titulo,
            jsonParsed.color,
            jsonParsed.precio,
            jsonParsed.stock,
            jsonParsed.imagen
        );
    }
}