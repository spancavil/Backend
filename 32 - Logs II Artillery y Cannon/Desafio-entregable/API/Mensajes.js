const mensajeDAO = require('../models/mensajesDAO');

const {loggerError} = require('../loggers/winston')

const mensajedao = new mensajeDAO;

class Mensajes {
    constructor(){
    }

    async leerMensajes(){
        try{
            const mensajes = await mensajedao.traerMensajes();
            if (mensajes){
                return mensajes;
            }
        }
        catch (e) {
            loggerError.log("error", "Entro a error!")
        }g
    }

    async guardarMensajes(mensaje){
        await mensajedao.guardar(mensaje);
    }
}

module.exports = Mensajes;