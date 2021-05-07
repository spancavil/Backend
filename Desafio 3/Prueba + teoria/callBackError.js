//Este bloque a veces da errores y a veces no. Porque estamos usando valores random para restar.

const funcionRestarSaldo = (saldo, valorProducto, callBack) => {
    let nuevoSaldo = (saldo - valorProducto);
    nuevoSaldo < 0 ?
        callBack(new Error("El saldo es menor al valor del producto!")):
        callBack("Operación exitosa!");
}

funcionRestarSaldo (Math.random(), Math.random(), (err, resultado)=>{
    err ? console.log(err) : null;
    resultado ? console.log(resultado) : null;
})