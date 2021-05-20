/**
 * Desafio generico - tiempo 5/10 minutos
 * Realizar un programa que ejecute las siguientes tareas:
 * A) Lea el archivo info.txt generado en el desafío anterior deserializándolo en un objeto llamado info.
 * B) Representar este objeto info en la consola.
 * C) Modifique el author a "Coderhouse" y guarde el objeto serializado en otro archivo llamado package.json.coder
 * D) Mostrar los errores por consola.
*/
const fs = require('fs');
let contenido = '';
path = './package.json';
pathWrite = './info.txt';

fs.readFile(path,(error, data)=> {
    if (error) {
        console.log ("Error: ", error.message);
    }

    else {
        contenido = data;
        console.log (contenido); //Me lo lee en formato de bytes
        objetoBundle = declararObjeto(contenido);
        guardarArchivo(JSON.stringify(objetoBundle, null, '\t'), pathWrite);
    }
})

function declararObjeto(contenido){
    objetoParsed = JSON.parse(contenido);
    let objeto = {
        contenidoStr: contenido.toString(), //Necesitamos hacerlo toString para que nos convierta la codificación
        contenidoObj: objetoParsed,
        size: contenido.length
    }
    return (objeto);
}

function guardarArchivo(objetoBundleString, path){
    fs.writeFile(path, objetoBundleString, error=>{
        if (error){
            console.log("Error: ", error);
        }
        else{
        console.log("Se escribió correctamente el archivo!");
        }
    })
}