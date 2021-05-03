function funcion1(parametro1){
    let nombre = "Closure";
    function mostrarNombre () {
        console.log(nombre);
        console.log(parametro1);
    }
    return mostrarNombre
}

//miFuncion se ha convertido en un closure. Un closure es un tipo especial de objeto que combina dos cosas: 
//una función, y el entorno en que se creó la misma.

let miFuncion = funcion1("Este es un parámetro");

console.log(miFuncion);
miFuncion("JAJA");