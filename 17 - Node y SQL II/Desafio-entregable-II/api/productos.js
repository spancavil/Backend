import ProductosMySQL from '../db/productos.js'

class Productos {
    constructor() {
        this.productosMySQL = new ProductosMySQL()
    }

    async get() {
        try{
            let productos = await this.productosMySQL.leer()
            return productos.length ? productos : []
        } catch (e) {
            console.log(e)
        }
    }

    async listar(id) {
        try{
            let prod = await this.productosMySQL.leer(id)
            return prod.length ? prod : {message : 'producto no encontrado'}
        } catch (e) {
            console.log(e)
        }
    }

    async listarAll() {
        try{
            let productos = await this.productosMySQL.leer()
            return productos.length ? productos : {message : 'no hay productos cargados'}
        } catch (e) {
            console.log(e)
        }
    }

    async guardar(prod) {
        try {
            return await this.productosMySQL.guardar(prod)
        } catch (e) {
            console.log(e)
        }
    }

    async actualizar(prod,id) {
        try {
            let result = await this.productosMySQL.actualizar(prod,id)
            if(!result){
                return {message: "Error al actualizar el producto"}
            }else{
                return {message: "Producto actualizado"}
            }
        } catch (e) {
            console.log(e)
        }
    }

    async borrar(id) {
        try {
            return await this.productosMySQL.borrar(id)
        } catch (e) {
            console.log(e)
        }

    }
}

export default Productos;
