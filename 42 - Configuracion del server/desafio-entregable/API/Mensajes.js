const {loggerError} = require('../loggers/winston')

//Adquirimos la instancia de la factory pasándole los parámetros correspondientes.
const Factory = require ('../persistence/persistFactory');
const factory = new Factory("mensajes");
const mensajedao = new (factory.getPersist());

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