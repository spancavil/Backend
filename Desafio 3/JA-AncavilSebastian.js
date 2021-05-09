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

// funcion de espera. Es una promesa.
const esperar = ret => {
    return new Promise ((resolve,reject) => {
        setTimeout(()=>{
            resolve(null);
        },ret)
    })
}

// muestra las palabras en orden a partir de un texto. Hacemos un async await para que espere a cuando se resuelve la promesa.
const mostrarPalabras = async (texto, tiempo, cantidadPalabras, callback) => {
    let palabras = texto.split(" ");
    for (const palabra of palabras) {
        console.log (palabra);
        await esperar(tiempo);
    }
    cantidadPalabras += palabras.length; //Sumamos a la cantidad de palabras que había el largo actual;
    console.log (cantidadPalabras);
    callback(cantidadPalabras); //Devolvemos a la función callback la cantidad de palabras resultante.
}

let texto1 = 'primer texto';
let texto2 = 'curso backend de coderhouse';
let texto3 = 'probando llamadas asincronas en nodejs';
const tiempo = 1000;

//Generamos la entrada del usuario mediante input.
const inputTime = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

//Question sería una especie de prompt, que genera un callback.
inputTime.question('Ingrese un tiempo en segundos o deje en blanco (default 1 seg):', tiempo => {
    console.log (tiempo*=1000);
    tiempo ?  showWords (tiempo): showWords (1000);
    inputTime.close();
});

function showWords (time) {
    mostrarPalabras(texto1, time, 0, (totalPalabras, err) => {
        mostrarPalabras(texto2, time, totalPalabras, (totalPalabras, err) => {
            mostrarPalabras(texto3, time, totalPalabras, (totalPalabras, err) => {
                console.log('Proceso terminado, cantidad de palabras: ' + totalPalabras);
            });
        })
    });
}

/*Comentario Angie:
Hola, Sebastian. Muy buen trabajo! 

Solamente te falto hacer configurable el tiempo, es decir, que si a la funcion se le pasa el parametro tiempo, 
se ejecute con ese tiempo y si no, que se ejecute cada segundo. Seguro conoces el operador ternario que te funciona 
muy bien para  este caso. Te lo comento por si quieres probarlo:

https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

Tambien,  como se que eres muy aplicado, trata de realizar este ejercicio usando setInterval
*/