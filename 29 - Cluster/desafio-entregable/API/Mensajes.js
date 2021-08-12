const mensajeDAO = require('../models/mensajesDAO');

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
            console.log("Entro a error!")
        }
    }

    async guardarMensajes(mensaje){
        await mensajedao.guardar(mensaje);
    }
}

module.exports = Mensajes;