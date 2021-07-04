const {sqlite3} = require('../cfg/config'); //importamos las opciones de conexion para mysql
const knex = require('knex')(sqlite3); //Le pasamos las opciones de conexion

knex.schema.hasTable('mensajes')
    .then(res=>{
        console.log(res);
        if (res){
            console.log("Ya existe la tabla!");
        } else {
            knex.schema.createTable('mensajes', table=>{
                table.string('mensajes');
                console.log("La tabla no existia, se creo!");
            }).then(()=> null);
        }
    })
    .catch(error => {
        console.log('error:', error);
    }).finally(() => {
        console.log('cerrando conexion...');
        knex.destroy();
    });