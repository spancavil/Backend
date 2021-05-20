//regExp

let regExp = /[\w]+@[a-z]+.[a-z]+/g
const str = ["soancavil@gmail.com", "jajajaja", "2123123", "osjdojasods@", "gijgijg@gmail.com"]
const array = [];

function Match(elemento) {
    array.push(...elemento.matchAll(regExp));
}

for (const elemento of str) {
    Match(elemento);
}

console.table(array);

//Importado dinámico

const moduleSpecifier = './modulo1.js';

import(moduleSpecifier)
.then(moduloImportado => {
    console.log (Persona)
    console.log(moduloImportado)
    });

//Clases privadas

class Mouse {

    #precio; //Declaramos precio como privado

    constructor(tamaño){
        this.#precio = 1500; //El hash indica que es un atributo privado y no será accesible desde arafue.
        this.tamaño = tamaño;
    }
    getPrecio (){
        return this.#precio;
    }

    getTamaño (){
        return this.tamaño
    }
}

let mouse1 = new Mouse("Mediano");
console.log(mouse1.precio); //No devuelve nada
console.log(mouse1.getPrecio()); //Devuelve el precio que era private sólo accesible desde la class.