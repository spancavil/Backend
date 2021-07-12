import { sqlite3 } from './dbConfig.js'
import knexLib from 'knex'

class MensajesSQLite3 {
    constructor() {
        this.knex = knexLib(sqlite3);
        (async() => {
            let exists = await this.knex.schema.hasTable('mensajes')
            if (!exists) {
                await this.knex.schema.createTable('mensajes', table => {
                    table.increments('id').primary();
                    table.string('author', 30);
                    table.string('text', 100);
                    table.string('timestamp',50);
                });
                console.log('Tabla de mensajes creada!')
            }
        })()
    }

    leer() {
        return this.knex('mensajes').select('*')
    }
    
    guardar(mensaje) {
        return this.knex('mensajes').insert(mensaje) 
    }
}

export default MensajesSQLite3

