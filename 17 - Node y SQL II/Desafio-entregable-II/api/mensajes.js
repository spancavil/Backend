import MensajesSQLite3 from '../db/mensajes.js'

class Mensajes {

    constructor() {
        this.mensajesSQLite3 = new MensajesSQLite3()
    }

    async getAll() {
        try {
            return await this.mensajesSQLite3.leer()
        }
        catch {
            return []
        }
    }

    async guardar(mensaje) {
        try {
            mensaje.timestamp = new Date().toLocaleString()
            await this.mensajesSQLite3.guardar(mensaje)
        }
        catch(error) {
            console.log('Error en guardar mensaje', error)
        }
    }
}

export default Mensajes
