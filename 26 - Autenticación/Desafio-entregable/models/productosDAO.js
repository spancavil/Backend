const {knexMySQL} = require("../databases/knex");

class ProductosDAO {
    constructor(){
        knexMySQL.schema.hasTable('productos')
        .then(res=>{
            if (res){
                null
            } else {
                knexMySQL.schema.createTable('productos', table=>{
                    table.increments('id');
                    table.string('title');
                    table.string('price');
                    table.string('thumbnail');
                }).then(()=> null);
            }
        })
    }

    async listar(){
        try {
            let productos = await knexMySQL('productos').select('*');
            let productosArray = [];
            if (productos.length !== 0) {
                for (const producto of productos) {
                    productosArray.push({
                        id: producto.id,
                        title: producto.title,
                        price: producto.price,
                        thumbnail: producto.thumbnail
                    });
                }
                return productosArray;
            } else {
                return {error: "No hay productos cargados"};
            }
        } catch (error) {
            console.log('Error!: ', error);
        }
    }

    async listarId(productoId){
        try {
            let rows = await knexMySQL('productos')
            .where({id: productoId});
            if (rows.length !== 0) {
                let producto;
                for (const row of rows) {
                    producto = {
                        id: row.id,
                        title: row.title,
                        price: row.price
                    }
                }
                return producto;
            } else {
                return {error: "Producto no encontrado."}
            }
        } catch (error) {
            console.log(error);
        }
    }

    async agregar(producto){
        try {
            let response = await knexMySQL('productos').insert({
                price: producto.price,
                title: producto.title,
                thumbnail: producto.thumbnail
            });
            return response;
        } catch (e) {
            console.log('Error!: ', e);
        }


    }

    async update(producto, productoId){
        try {
            let response = await knexMySQL('productos')
            .where({
                id: productoId
            })
            .update(producto);
            return response;
        } catch (error) {
            console.log("Error en update: ", error);
        }
    }
    async borrar(productoId){
        try {
            let response = await knexMySQL('productos')
            .where({
                id: productoId
            })
            .del();
            return response;
        } catch (error) {
            console.log("Error en borrar", error);
        }
    }

}

module.exports = ProductosDAO;