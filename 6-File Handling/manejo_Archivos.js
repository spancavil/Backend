const fs = require('fs');

const productos = [];

//El id se lo agregamos dinámicamente
const producto1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

const producto2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

const producto3 = {
    title: 'Globo Terráqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

class Archivo {

    constructor(path) {
        this.path = path
    }

    async leer() {
        try {
            let contenido = await fs.promises.readFile(this.path);
            return(JSON.parse(contenido));
        } catch (error) {
            console.log("No existe el archivo, devolvemos un array vacío: ");
            let arrayVacio = [];
            return arrayVacio;
        }
    }

    async borrar() {
        try {
            await fs.promises.unlink(this.path);
        } catch (error) {
            console.log("No se pudo borrar el archivo: ", error);
        }
    }

    async guardar(producto) {
        try {
            producto['id'] = productos.length + 1; //Agregamos la propiedad id al producto
            productos.push(producto);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t')); //Tenemos que pasarlo a JSON (formato de caracteres) para guardarlo
        }
        catch (error) {
            console.log("Error en el guardado del archivo: ", error);
        }
    }

}

//Necesitamos que la función sea asíncrona para que espere que se cumplan las funciones (que en definitiva son promesas)
async function archiveExe() {
    
    await miArchivo.guardar(producto1);
    
    let contenido = await miArchivo.leer();
    console.log(contenido);
    console.log("----------------------------------");
    
    await miArchivo.guardar(producto2);
    
    contenido = await miArchivo.leer();
    console.log(contenido);
    console.log("----------------------------------");

    await miArchivo.borrar();
    
    contenido = await miArchivo.leer();
    console.log(contenido);

}

//Declaramos la clase archivo y le mandamos el path correspondiente. En caso de no existir el archivo, se genera.
const miArchivo = new Archivo(`./productos.txt`);
archiveExe();