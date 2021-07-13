const ProductosMongo = require('../models/productosMongo');

class Producto {
    constructor (){
    }
    //Listar todos los productos
    async listar(){

        try {
            const lista = await ProductosMongo.find({});
            if (lista) {
                console.log(lista);
                return lista;
            }
            else {
                return {info: "No hay productos cargados"};
            }

        } catch (e) {
            console.log("Error al leer los mensajes: ", e);
        }
        
    }
    //Listar por ID
    async listarId(productoId){
        try {
            console.log(productoId);
            const producto = await ProductosMongo.findById(productoId)
            if (producto) {
                console.log(producto)
                return producto;
            }
            else {
                return {info: "No hay producto cargado con ese id"};
            }
        } catch (e) {
            console.log("Error al leer el producto por id: ", e);

        }
    }
    //Agregar un producto
    async agregar(producto){
        try {
            if (producto.price && producto.title && producto.thumbnail){
                let response = await ProductosMongo.create(producto);
                return response;
            } else{return {error: "Invalid object"}}
        } catch (e) {
            console.log("Error al guardar el producto: ", e);

        }
    }
    //Borrar un producto por Id
    async borrar(productoId){
        try {
            const response = ProductosMongo.findByIdAndDelete(productoId);
            return response;
        } catch (error) {
            console.log("Error al borrar el producto: ", error)
        }
    }
    //Actualizar un producto por Id.
    async update(productoId, producto){
        try {
            console.log(producto);
            const response = await ProductosMongo.findByIdAndUpdate(productoId, producto);
            return response;
        } catch (error) {
            console.log("Error en el model Producto: ", error)
        }
    }

}

module.exports = Producto;