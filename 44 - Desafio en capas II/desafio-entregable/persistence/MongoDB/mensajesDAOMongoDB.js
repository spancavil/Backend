const { loggerError } = require("../../loggers/winston");
const MensajesMongo = require("../../models/Mensajes");
const IMensajesDAO = require("../IMensajeDAO");

class mensajesDAOMongoDB extends IMensajesDAO{
    constructor(){
        super();
    }

    async guardar(mensaje){
        try {
            const response = await MensajesMongo.create(mensaje);
            return response;
        } catch (e) {
            loggerError.log('error', 'Error al guardar en Mongo un mensaje: ', e)
        }    
    }

    async traerMensajes(){
        try {
            const lista = await MensajesMongo.find({});
            if (lista){
                return lista;
            }
            else {
                return {message: "No hay mensajes cargados"}
            }
        } catch (e) {
            loggerError.log('error', "Error al traer los mensajes: ", e);
        }
    }
}

module.exports = mensajesDAOMongoDB;