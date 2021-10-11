const { loggerError, loggerConsole } = require("../loggers/winston");
const arguments = require('yargs').argv;

//Obtenemos el tipo de persistence desde la consola desde "env"

const persistence = arguments.environ === "production" ? "MongoDB" : "Knex"

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
            let modulo = require(`./${this.persistence}/${this.type}DAO${this.persistence}`);
            return modulo;
        } catch (e) {
            loggerConsole.log('debug', "Tipo de persistencia no encontrada.", e);
            loggerError.log('error', "Tipo de persistencia no encontrada.");
        }
    }
}

module.exports = Factory;