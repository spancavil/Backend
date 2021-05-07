/**
 * desarrollar la funcion mostrarLetras que reciba un string como
 * parametro y permita mostrar una vez por segundo cada uno de sus
 * caracteres.
 * Tiempo aproximado: 20-25 minutos
 */

 const esperar = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const mostrarLetras = async (cadena, tiempo, callback) => {
    for (const char of cadena) {
        console.log (char);
        await esperar(tiempo);
    }
    callback(); //llamamos al callback desde la llamada a la función, se ejecuta siempre al final.
}
const fin = () => { console.log ("Termine! ")}

// llamar a las funciones con 0, 250 y 500 ms
mostrarLetras('bienvenidos', 200, fin);