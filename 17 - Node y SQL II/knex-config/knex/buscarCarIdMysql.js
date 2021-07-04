const {mysql} = require('../cfg/config');
const knexMySQL = require('knex')(mysql);

knexMySQL('cars2').where({
    id: 5
}).then(rows =>{
    console.log(rows)
    for (const row of rows) {
        console.log({
            id: row.id,
            title: row.title,
            price: row.price
        });
    }
    knexMySQL.destroy();
})