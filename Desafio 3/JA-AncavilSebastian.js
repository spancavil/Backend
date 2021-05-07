/**
 * Plantilla base para el desafio entregable de Javascript asincrono
 * 
 * Desarrollar una función que permita recorrer un texto que se le pase como parámetro 
 * y muestre cada una de sus palabras en un tiempo estipulado. 
 * Al finalizar debe ejecutar una función que se le pasa como callback.
 * 
 * Realizar tres llamadas a la función con porciones de texto que tienen que ser 
 * representados en forma ordenada. Inicialmente todas las palabras del primero, 
 * luego las del segundo y finalmente las del tercero.
 * 
 * Hacer configurable el tiempo de representación de palabras mediante un parámetro opcional.
 * Si este no se define será cada un segundo.
 * 
 * Al finalizar el la operación completa debe imprimir: ‘proceso completo’ y también mostrar
 * la cantidad de palabras totales
 * Aclaracion: no usar variables globales y clases y ejecutar con NodeJS (no tsc)
 */

// funcion de espera. Sería SINCRONICO ESTO.
const esperar = ret => { for (let i = 0; i < ret * 3e6; i++); }

// muestra las palabras en orden a partir de un texto
const mostrarPalabras = (texto, tiempo, cantidadPalabras, callback) => {
    let palabras = texto.split(" ");
    for (const palabra of palabras) {
        console.log (palabra);
        esperar(tiempo);
    }
    cantidadPalabras += palabras.length; //Sumamos a la cantidad de palabras que había el largo actual;
    console.log (cantidadPalabras);
    callback(cantidadPalabras); //Devolvemos a la función callback la cantidad de palabras resultante.
}

let texto1 = 'primer texto';
let texto2 = 'curso backend de coderhouse';
let texto3 = 'probando llamadas asincronas en nodejs';
const tiempo = 500;

mostrarPalabras(texto1, tiempo, 0, (totalPalabras, err) => {
    mostrarPalabras(texto2, tiempo, totalPalabras, (totalPalabras, err) => {
        mostrarPalabras(texto3, tiempo, totalPalabras, (totalPalabras, err) => {
            console.log('Proceso terminado, cantidad de palabras: ' + totalPalabras);
        });
    });
});