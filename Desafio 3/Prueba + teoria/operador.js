const operador = async (a, b, operacion) => {
    let {suma } = await import(`./${operacion}.js`);
    console.log (suma);

} 

operador(2,3, "suma");