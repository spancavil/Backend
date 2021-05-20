
/**
 * Desafio generico - tiempo 5/10 minutos
 * Guardar en un archivo fyh.txt la hora actual y leerlo usand operaciones sync
 */
 const fs = require('fs');

const today = new Date();
const data = "Log: " + today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const ruta = './misFechas.txt';
const rutaFalsa = './fechasMalas.txt';
escribir(ruta, data);
leer(ruta);
leer(rutaFalsa);

function escribir(ruta, data) {
    fs.writeFileSync(ruta, data)
}

function leer(ruta) {
    try {
        let contenido = fs.readFileSync(ruta, 'utf-8')
        console.log (contenido);
    } catch (error) {
        console.log("Error, no existe el archivo.");
    } finally {
        console.log ("Closing..");
    }
}

/*

https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/ 

*/