const {mysql} = require('../cfg/config');
const knexMySQL = require('knex')(mysql);

knexMySQL('cars2').insert({
    title: "Volvo",
    price: "1500000",
    thumbnail: "url/false/volvo"
}).then (res=>{
    console.log(`Auto insertado: ${res}`);
}).finally(()=> knexMySQL.destroy())

