//función asterisco devuelve múltiples cosas
import {Observale} from rxjs;

function* generatorUnreacheableValue() {
    console.log("Iniciando generator function..");
    yield "First";
    yield "Second";
    return "Ultimo valor";
    yield "Unreacheable"
   }
var generatorObject = generatorUnreacheableValue();

console.log(generatorObject.next().value)
console.log(generatorObject.next().value)
console.log(generatorObject.next().value)
console.log(generatorObject.next().value) // No devuelve nada porque ya no hay nada para devolver
console.log(generatorObject.next().value) //Tampoco devuelve nada

// PULL : función (simple) / iterator o generador (funcion asterisco)
// El productor espera a que le pidan datos, el consumidor determina cuándo. Es un proceso sincrónico.

// PUSH: promise (simple) / observable (push múltiple). El observable genera datos cuando le pinta (es como un youtuber
//en cambio el consumidor de estos datos se llama observador y puede suscribirse también cuando quiera)
// El productor determina cuando devuelve los datos, el consumidor espera.

const observable = rxjs.interval(1000);
const subscripcion = observable.subscribe(x => console.log(x));



