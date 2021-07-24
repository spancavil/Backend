const mensajesMongo = require('../models/mensajesMongo');
const fs = require('fs');
require ('../databases/mongoAtlasConn');
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

class MensajesDAO{
    async guardar(mensaje){
        try {

            const response = await mensajesMongo.create(mensaje);
            console.log(response);
            return;
        } catch (e) {
            console.log("Error al guardar un mensaje en MongoAtlas: ", e);
        }
    }

    async traerMensajes(){
        try {
            const mensajesCrudo = await mensajesMongo.find({});
            const mensajes = {
                id: "LALALA",
                mensajes: [...mensajesCrudo]
            }
            
            if (mensajes){
                console.log(mensajes);
                console.log("entro a traer mensajes!");
                const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'})

                const schemaMensaje = new schema.Entity('mensaje', {
                    author: schemaAuthor
                })

                const schemaMensajes = new schema.Entity('mensajes', {
                    mensajes: [schemaMensaje]
                }, {idAttribute: "LALALA"});

                const normalizedData = normalize(mensajes, schemaMensajes);
                const normalizedDataString = JSON.stringify(normalizedData, null, '\t')
                const originalDataString = JSON.stringify(mensajes, null, '\t')

                const compresion = (normalizedDataString.length / originalDataString.length * 100);
                console.log(compresion);
                fs.writeFileSync('./objetoNormalizado.json', JSON.stringify(normalizedData, null, '\t'))

                return mensajes;
            }
            else {
                return [];
            }
        } catch (e) {
            console.log("Error al leer los mensajes en MongoAtlas: ", e);
        }
    }
}

module.exports = MensajesDAO;