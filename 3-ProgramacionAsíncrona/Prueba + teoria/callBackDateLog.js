const formatFecha = fechaSinFormat => {
    return `${fechaSinFormat.getDate()}-${fechaSinFormat.getMonth()+1}-${fechaSinFormat.getFullYear()}`;
}

const fileWrite = (route, data, callbackLog) => {
    setTimeout(()=>{
        //GRABADO DE ARCHIVOS FICTICIO
        let fechaString = formatFecha(new Date());
        callbackLog (fechaString, `Grabación exitosa en la ruta ${route}`);
    }, 1500)
    
}

const logueo = (fechaString, mensaje) => {
    console.log (`Fecha ${fechaString}: ${mensaje}.`);
}

fileWrite ("/ruta/falsa/123", "datosprivados.JSON", logueo);