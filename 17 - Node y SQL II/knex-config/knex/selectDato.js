const {sqlite3} = require('../cfg/config');
const knex = require('knex')(sqlite3);

knex.from('cars').select('*')
.then(rows => {
    for (row of rows) {
        console.log(`${row['id']} ${row['name']} ${row['price']}`);
    }
    console.log(rows);
}).catch(error => {
    console.log('error:', error);
}).finally(() => {
    console.log('cerrando conexion...');
    knex.destroy();
});