function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function* hacerID() {
    let cantidadRequest=1;
    while (true){
        let mensaje = `Número aleatorio: ${obtenerRandom(1, 1000)}, fecha: ${new Date().toLocaleString()}.`;
        yield (`${mensaje}, cantidad de veces: ${cantidadRequest++}`);
    }
}

let obtenerId = hacerID();

console.log(obtenerId.next().value);
console.log(obtenerId.next().value);

