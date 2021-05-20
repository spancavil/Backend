/* 
Pequeña función con callbacks para determinar si un número es múltiplo de otro.
También ejecuta restas.
*/

const resta = (a,b)=> a - b;

const modulo = (a,b) => a % b;

const operador = (a,b,operacion, callback) => {
    let resultado = operacion(a,b);
    callback(resultado, a, b)
}

const esMultiplo = (resultado, a, b) => {
    resultado === 0 ? 
    console.log(`${a} ES múltiplo de ${b}.`):
    console.log(`${a} NO es múltiplo de ${b}.`)}

const imprimirResta = (resultado) => {console.log("La resta dio:", resultado)}

operador (4,2,modulo, (resultado)=> {console.log("Esto se ejecuta al final: ", resultado)}); //Un callback dentro del mismo llamado a la función
operador (625, 5, modulo, esMultiplo); //un callback externo (esMultiplo)
operador (1000, 998, resta, imprimirResta); // Otro callback externo (imprimirResta);