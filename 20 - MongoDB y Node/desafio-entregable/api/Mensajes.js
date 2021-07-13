const mensajesMongo = require('../models/mensajesMongo');

class Mensajes {
    constructor(){
    }

    async leerMensajes(){
        try{
            const mensajes = await mensajesMongo.find({});
            if (mensajes){
                return mensajes;
            }
        }
        catch (e) {
            console.log("Error al leer los mensajes: ", e)
        }
    }

    async guardarMensajes(mensaje){
        console.log("Entro a guardar");
        console.log(mensaje);
        try {
            return await mensajesMongo.create(mensaje);
        } catch (error) {
            console.log("Error al guardar los mensajes: ", e)
        }
    }
}

module.exports = Mensajes;