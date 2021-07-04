const {sqlite3, mysql} = require('../config/dbconfig');
const knexLite = require('knex')(sqlite3);
const knexMySQL = require('knex')(mysql)

// exporto el objeto para usarlo en otros modulos
module.exports = {knexLite, knexMySQL};