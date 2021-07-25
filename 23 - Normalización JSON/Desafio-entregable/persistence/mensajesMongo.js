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
            console.log("Entro a guardar!");
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
            if (mensajesCrudo){
                const mensajesNormalizados = this.normalizeMensaje(mensajesCrudo);
                return mensajesNormalizados;
            } else {
                return [];
            }
        } catch (e) {
            console.log("Error al leer los mensajes en MongoAtlas: ", e);
        }
    }

    normalizeMensaje(mensajesCrudo){
        const cuerpoMensajes = [];
            for (const mensaje of mensajesCrudo) {
                cuerpoMensajes.push({
                    author: mensaje.author,
                    text : mensaje.text,
                    timestamp: mensaje.timestamp
                })
            }
            const mensajes = {
                id: "id",
                mensajes: [...cuerpoMensajes]
            }

            if (mensajes){
                const users = new schema.Entity('users', {}, {idAttribute: 'email'})

                const schemaMensaje = new schema.Entity('mensajes', {
                    author: users
                }, {idAttribute: 'timestamp'})

                const schemaMensajes = new schema.Entity('allmensajes', {
                    mensajes: [schemaMensaje]
                }, {idAttribute: "id"});

                const normalizedData = normalize(mensajes, schemaMensajes);
                const normalizedDataString = JSON.stringify(normalizedData, null, '\t')
                const originalDataString = JSON.stringify(mensajes, null, '\t')

                //const compresion = (normalizedDataString.length / originalDataString.length * 100);
                //console.log(compresion);

                //fs.writeFileSync('./objetoNormalizado.json', JSON.stringify(normalizedData)
                //fs.writeFileSync('./objetoDESNormalizado.json', JSON.stringify(normalizedData)
                return normalizedData;
            }
    }
}

module.exports = MensajesDAO;