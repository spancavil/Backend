const { knexLite } = require("../databases/knex");

class MensajesDAO {
    constructor (){
        knexLite.schema.hasTable('mensajes')
        .then(res=>{
            if (res){
                null
            } else {
                knexLite.schema.createTable('mensajes', table=>{
                    table.string('author');
                    table.string('text');
                    table.string('date')
                }).then(()=> null);
            }
        })
    }

    async guardar(mensaje){
        console.log(mensaje);
        try{
            let response = await knexLite('mensajes').insert(mensaje);
            return response;
        } catch(e){
            console.log('Error!: ', e);
        }
    }

    async traerMensajes(){
        try {
            let mensajes = await knexLite('mensajes').select('*');
            let mensajeArray = [];
            if (mensajes) {
                for (const mensaje of mensajes) {
                mensajeArray.push({
                    author: mensaje.author,
                    text: mensaje.text,
                    date: mensaje.date
                });
                }
            }
            return mensajeArray;
        } catch (error) { 
            console.log('Error!: ', error);
        }
    }
}

module.exports= MensajesDAO;