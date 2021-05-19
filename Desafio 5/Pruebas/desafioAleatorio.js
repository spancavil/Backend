/**
 * Desafio generico - 5 minutos
 * Crear un proyecto en nodejs que genere 10000 numeros aleatorios en el
 * rango de 1 a 20.
 * Crear un objeto cuyas claves sean los numeros salidos y el valor asociado sea
 * la cantidad de veces que salio dicho numero.
 * Representar por consola los resultados.
 */

 let valores = {};

 function obtenerRandom(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }

 for (let i = 0; i < 10000; i++) {
    let num = obtenerRandom(1,21);
    if (!valores[num]) {
        valores[num] = 1;
    }
    else {
        valores[num] +=1;
    }
 }    

 console.log (valores);

 /**
 * Desafio generico - tiempo 5 minutos
 * Completar el desafio generico obteniendo la informacion solicitada
 * 
 * A) Los nombres de los productos en un string separados por comas.
 * B) El precio total
 * C) El precio promedio
 * D) El producto con menor precio
 * E) El producto con mayor precio
 * F) Con los datos de los puntos 1 al 5 crear un objeto y representarlo por consola
 */
let productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terraqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 },
]

const reducer = (accumulator, currentValue) => accumulator.nombre + currentValue.nombre;

string = productos.reduce(reducer)

console.log(string)