const fs = require('fs');

//Leemos el directorio utilizando callbacks
carpetasCallback = fs.readdir('./', (error, content)=>{
    error ? console.log(error):
    console.log (content);
    console.log("--------------------------------")
})

//Leemos el dir utilizando promises
fs.promises.readdir('./readFile.js').then( data => {
    console.log(data);
})
.catch( err => {
    console.log("Error en el callback!");
    console.log("--------------------------------")
}); //Da error porque readFile es un archivo no una carpeta.

//Finalmente utilizamos utilizamos una funcion async IIFE (autoinvocada inmediatamente)
//Para colocar en un await la promesa de leer el archivo, todo en un bloque try catch.

(async function (){
    try {
        content = await fs.promises.readdir('./blabla');
        console.log(content);
    } catch (error) {
        console.log("Error en la async!");
    }
})()
