const ProductoModel = require("../models/Producto");

class Producto {
    constructor (){
        this.productos = [];
        this.id = 1;
    }

    generar(cantidad){
        if (cantidad <= 0) {
            return {message: "Ingrese una cantidad válida"}
        }
        else {
            const productos = [];
            for (let i = 0; i < cantidad; i++) {
                productos.push(ProductoModel.generarProducto());
            }
            return productos;
        }
    }

}

module.exports = new Producto ();