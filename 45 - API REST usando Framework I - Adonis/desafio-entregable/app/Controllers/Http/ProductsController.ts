// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/http-server/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";

export default class ProductsController {
    public async index(){
        try {
            return await Database.from('products').select('*');
        } catch (error) {
            return {error: "Error al obtener productos: ", ...error}
        }
    }
    
    //utilizo el ctx a modo de ejemplo nada más, para probar. También se puede hacer destructuring de request

    public async save (ctx: HttpContext){
        const {title, price, thumbnail} =  ctx.request.body()
        try {
            const response = await Database
                .table('products')
                .insert({
                    title,
                    price,
                    thumbnail 
                })
            const id = response;
            if (id) {
                return {msg: `Producto guardado correctamente con id: ${id}`}
            }
        } catch (error) {
            return {error: "Error al guardar un producto: ", ...error}
        }
    }

    public async getById ({request}){
        const id = request.params().id
        try {
            const response = await Database.from('products').where('id', id)
            if (response.length === 0 ) return {msg: `No products with id ${id}`}
            return { msg: response } 
        } catch (error) {
            return {error: "Error al eliminar un obtener un producto por Id: ", ...error}
        }
    }

    public async delete ({request}) {
        const id = request.params().id
        try {
            const response = await Database
            .from('products')
            .where('id', id)
            .delete
            if (response) {
                return response
            }
            else return {msg: "No products by that id"}
        } catch (error) {
            return {error: "Error al eliminar un producto: ", ...error}
        }
    }

    public async update ({request}) {
        const id = request.params().id
        const {title, price, thumbnail} = request.body()
        try {
            const response = await Database
            .from('products')
            .where('id', id)
            .update({
                title,
                price,
                thumbnail 
            })
            //console.log(response) => devuelve 1 si encuentra el producto, 0 si no lo encuentra
            if (response) {
                return {msg: `Producto con id ${id} actualizado correctamente`}
            }
            return {msg: `Producto con id ${id} no encontrado en la base de datos`}

        } catch (error) {
            return {error: "Error al actualizar un producto: ", ...error}
        }
    }

}
