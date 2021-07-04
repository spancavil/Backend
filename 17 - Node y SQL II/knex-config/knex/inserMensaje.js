const {sqlite3} = require('../cfg/config');
const knex = require('knex')(sqlite3);

knex('mensajes').insert({mensajes: "Hola20"})
.then(()=>null)
.finally(()=> knex.destroy());