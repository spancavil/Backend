const {sqlite3} = require('../cfg/config');
const knex = require('knex')(sqlite3);

knex.schema.hasTable('cars2')
.then((response)=> console.log("Hay tabla: ", response))
.catch((e)=> console.log("No hay table:", e))
.finally(()=> knex.destroy());