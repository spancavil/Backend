
const {sqlite3, mysql} = require('../cfg/config'); //importamos las opciones de conexion para mysql
const knex = require('knex')(sqlite3); //Le pasamos las opciones de conexion
const knexMySQL = require('knex')(mysql);

// knex.schema.createTable('cars2', table => {
//     table.increments('id');
//     table.string('name');
//     table.integer('price');
// }).then(() => {
//     console.log('tabla cars creada!');
//     knex('cars').insert({
//         name: "Fiat Palio",
//         price: 160000
//     })
//     console.log(knex('cars').select('*'))
// }).catch(error => {
//     console.log('error:', error);
//     throw error;
// }).finally(() => {
//     console.log('cerrando conexion...');
//     knex.destroy();
// });

//También es muy cómodo ejecutar un batch (IIFE)

knexMySQL.schema.createTable('cars2', table => {
    table.increments('id');
    table.string('title');
    table.string('price');
    table.string('thumbnail')
}).then(() => {
    console.log('tabla cars en SQL creada!');
}).catch((e)=> console.log(e))
.finally(()=> knexMySQL.destroy());
