//Promise.allSettled

const path1 = "./modulo1.js";
const path2 = "./modulo2.js";

let promesa1 = import(path1);
let promesa2 = import(path2);
let promesa3 = new Promise ((acc,rej) =>{
    setTimeout(() => {
        rej("Error de red.");
    }, 3000);
} )
let promesa4 = new Promise ((acc,rej) =>{
    setTimeout(() => {
        rej("Sin conexión bluetooth.");
    }, 1000);
} )

const promesas = [promesa1, promesa2, promesa3, promesa4];

Promise.allSettled (promesas).then((results)=> //Devuelve el resultado solamente cuando todas las promesas se resuelven.
    results.forEach(element => {
        console.log(element); 
    }))

//Promise.all sólo devuelve algo si se resuelven correctamente todas. Como en este ejemplo la tercera da reject, entonces
//va por el camino del catch y no devuelve nada.

Promise.all (promesas).then((results)=> 
    results.forEach(element => {
        console.log(element); 
    }))
.catch(rej => console.log("Error: " + rej));

console.log("----------------------------");
//Operador coalescente. Devuelve el operando derecho si el operador izquierdo es null o undef, en caso
//contrario devuelve el operando izquierdo

console.log(undefined??20);
console.log(undefined||20);

console.log(false??true);
console.log(false||true);