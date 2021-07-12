import { mariaDB } from './dbConfig.js'
import knexLib from 'knex'

class ProductosMariaDB {
    constructor() {
        this.knex = knexLib(mariaDB);
        (async() => {
            let exists = await this.knex.schema.hasTable('productos')
            if (!exists) {
                await this.knex.schema.createTable('productos', table => {
                    table.increments('id').primary();
                    table.string('title', 30);
                    table.float('price', 100);
                    table.string('thumbnail',200);
                });
                console.log('Tabla de productos creada!')
            }
        })()
    }

    leer(id) {
        return id ? this.knex('productos').select('*').where('id', id)
            : this.knex('productos').select('*')
    }
    
    guardar(producto) {
        return this.knex('productos').insert(producto) 
    }

    actualizar(producto, id) {
        return this.knex.from('productos').where('id', id).update(producto)
    }
    
    borrar(id) {
        return this.knex.from('productos').where('id', id).del()
    }
}

export default ProductosMariaDB

