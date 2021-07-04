const {sqlite3} = require('../cfg/config'); //importamos las opciones de conexion para mysql
const knex = require('knex')(sqlite3); //Le pasamos las opciones de conexion

knex('cars').insert({
    name: "Fiat Palio",
    price: 160000
})
.then(() => {
    console.log('Auto agregado a la tabla');
}).catch(error => {
    console.log('error:', error);
}).finally(() => {
    console.log('cerrando conexion...');
    knex.destroy();
});