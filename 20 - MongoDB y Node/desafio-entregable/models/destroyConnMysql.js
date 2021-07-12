const {knexMySQL} = require("../databases/knex");

knexMySQL.destroy().then(res=>{
    console.log(res);
});