const mensajeDAO = require('../persistence/mensajesMongo');

const mensajedao = new mensajeDAO;

class Mensajes {

    async leerMensajes(){
        try{
            const mensajes = await mensajedao.traerMensajes();
            if (mensajes){
                return mensajes;
            }
        }
        catch (e) {
            console.log("Error al leer mensajes en la API: ", e)
        }
    }

    async guardarMensajes(mensaje){
        try {
            console.log("Entro a guardar");
            console.log(mensaje);
            await mensajedao.guardar(mensaje);
        } catch (e) {
            console.log("Error al guardar mensajes en la API: ", e)
        }
    }
}

module.exports = Mensajes;