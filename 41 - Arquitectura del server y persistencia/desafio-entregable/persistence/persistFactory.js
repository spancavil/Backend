const { loggerError, loggerConsole } = require("../loggers/winston");
const dotenv = require('dotenv');
dotenv.config();

//TYPES OF PERSISTENCE: SQLITE (Knex) or MongoDB, MongoDB by default.
const persistence = process.env.PERSISTENCE || "MongoDB";

/**
 * FACTORY de persistencias
 * @constructor type: Qué tipo de objeto se almacenará en la persistencia
 * @method getPersist devuelve el módulo según el constructor
 */

class Factory {
    /**
     * @param type Tipo de objeto a utilizar por la persistencia (producto, carrito, mensaje, etc)
     */
    constructor(type) {
        this.type = type;
        this.persistence = persistence
    }

    getPersist() {
        try {
            console.log (`/${this.persistence}/${this.type}DAO${this.persistence}`)
            let modulo = require(`./${this.persistence}/${this.type}DAO${this.persistence}`);
            return modulo;
        } catch (e) {
            loggerConsole.log('debug', "Tipo de persistencia no encontrada.", e);
            loggerError.log('error', "Tipo de persistencia no encontrada.");
        }
    }
}

module.exports = Factory;