let error = false;
let numeros = [];
for (let index = 2; index < process.argv.length; index++){
    let numero = process.argv[index];
    typeof(numero) === String ? error = true: null;
    numeros.push(parseInt(numero));
}

error ? imprimirError() : imprimirArray()

function imprimirArray(){
    let datos = {
        datos: {
            numeros: numeros,
            promedio: (numeros.reduce((acumulador, current) => acumulador + current))/numeros.length,
            max: Math.max(...numeros),
            min: Math.min(...numeros),
            ejecutable: process.execPath,
            pid: process.pid
        }
    }

    console.log(datos)
}

function imprimirError (){
    
}