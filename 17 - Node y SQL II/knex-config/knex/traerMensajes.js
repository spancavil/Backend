const {sqlite3} = require('../cfg/config');
const knex = require('knex')(sqlite3);

(async ()=> {
    try {
        let mensajes = await knex('mensajes').select('*');
        let mensajeArray = [];
        for (const mensaje of mensajes) {
            mensajeArray.push(mensaje.mensajes);
        }
        console.log (mensajeArray);
        await knex.destroy();
    } catch (error) {
        onsole.log('Error!: ', e);
    }
})()