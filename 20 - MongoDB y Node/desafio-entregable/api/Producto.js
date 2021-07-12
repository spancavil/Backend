const ProductosDAO= require('../models/productosDAO');

const productoDAO = new ProductosDAO;

class Producto {
    constructor (){
    }

    async listar(){
        const lista = await productoDAO.listar();
        console.log(lista);
        return lista;
    }
    
    async listarId(productoId){
        const producto = await productoDAO.listarId(productoId)
        return producto;
    }

    async agregar(producto){
        if (producto.price && producto.title && producto.thumbnail){
            let response = await productoDAO.agregar(producto);
            return response;
        } else{return {error: "Invalid object"}}
    }

    // update(productoId, body){
    //     let producto = this.productos.find(element => element.id === parseInt(productoId));
    //     if (producto){
    //         this.productos[productoId-1] = {...body, id: parseInt(productoId)};
    //         return this.productos[productoId-1];
    //     } else {
    //         return {error: "Producto a actualizar no encontrado."};
    //     } 
    // }

    async borrar(productoId){
        try {
            const response = productoDAO.borrar(productoId);
            return response;
        } catch (error) {
            console.log("Error en el model Producto: ", error)
        }
    }

    async update(productoId, producto){
        try {
            const response = await productoDAO.update(producto, productoId);
            return response;
        } catch (error) {
            console.log("Error en el model Producto: ", error)
        }
    }

}

module.exports = Producto;