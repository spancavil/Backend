"use strict"

function miFuncion (arg1, arg2){
    console.log(this, arg1, arg2)
}

const Michu = {
    nombre: "Michu",
    especie: "Gato",
    saludar() {
        console.log(`Miaaaau (Hola me llamo ${this.nombre}.)`);
        console.log(this === Michu); //this sería el propio objeto Michu directamente.
    }
}

miFuncion ("HOLA", 50);
console.log("--------------");
Michu.saludar();
console.log("----------------")
let saludar = Michu.saludar();
saludar;



