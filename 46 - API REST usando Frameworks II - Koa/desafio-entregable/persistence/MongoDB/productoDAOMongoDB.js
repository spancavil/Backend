const IProductoDAO = require("../IProductoDAO");
const ProductoMongo = require('../../models/ProductoMongo');
const {loggerError} = require('../../loggers/winston');

class ProductoDAOMongoDB extends IProductoDAO {
    constructor(){
        super();
    }
    async listarId(productoId){
        try {
            const producto = await ProductoMongo.findById(productoId);
            if (producto){
                return producto;
            }
            else {
                return {message: "No hay producto cargado con ese id"};
            }
        } catch (error) {
            loggerError.log('error', "Error al listar por ID en productos.")
        }
    }

    async listar(){
        try {
            const lista = await ProductoMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay productos cargados"}
            }
        } catch (e) {
            loggerError.log('error', "Error al leer los mensajes: ", e);
        }
    }

    async agregar(producto){
        try {
            const response = await ProductoMongo.create(producto);
            return response;
        } catch (e) {
            loggerError.log('error', 'Error al guardar en Mongo: ', e)
        }
    }

    async update(productoId, producto){
        try {
            console.log("Hola!", productoId, producto)
            const response = await ProductoMongo.findByIdAndUpdate(productoId, producto);
            return response;
        } catch (error) {
            loggerError.log('error', "Error al actualizar un producto en Mongo: ", e)
        }
    }

    async borrar(productoId){
        try {
            const response = ProductoMongo.findByIdAndDelete(productoId);
            return response;
        } catch (e) {
            loggerError.log('error', "Error al borrar un producto en Mongo: ", e)
        }
    }
}

module.exports = ProductoDAOMongoDB;