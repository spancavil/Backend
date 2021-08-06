process.on ('message', cantidad => {
    let valores = {};
    cantidad < 1e9 ? null : cantidad = 1e9; //Limitamos la cantidad de numeros.
    for (let i = 0; i < cantidad; i++) {
        const max = 1000;
        const min = 1;
        let num = Math.floor(Math.random() * (max - min)) + min;
        if (!valores[num]) {
            valores[num] = 1;
        }
        else {
            valores[num] += 1;
        }
    }
    process.send(valores);
});