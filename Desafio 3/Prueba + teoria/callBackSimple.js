//Callback: Devolver la llamada
//Una función callback es una función que está como parámetro en otra función.

//IMPORTANTE, para poder hacer los export se necesita hacer un npm init y en el package JSON agregar:
//"type": "module"

import u from './operacionesModule.js';

console.log(u);

const operador = async (a, b, callback) => { //En este caso no utilizo la operación pero sí el callback.

    let {suma} = await import(`./operacionesModule.js`);    //Destructuring del import ./suma.js e importado dinámico con async await
    console.log( suma );                                     //Importamos la función suma de operacionesModule
    callback (suma(a,b));   //callback en este caso es la función imprimir.
} 

const imprimir = (valor) => console.log(valor);

operador(2,3, "suma", imprimir);

