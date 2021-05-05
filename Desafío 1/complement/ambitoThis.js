let numeroRandom = 20

function alterRandom () {
    // this.numeroRandom = 40;
    this.numeroRandom = 150;
    setTimeout(() => {
        let numeroRandom = 2340
        console.log("Ambito dentro de function con arrow function: " + this.numeroRandom + ". Se ve que la arrow capta el contexto de la función de más arriba.");
        console.log("En cambio este seria el numeroRandom de la propia arrow: "+ numeroRandom);
        console.log("Recorda que la arrow en sí misma no tiene contexto.")
        
    }, 2000);

    setTimeout(function (){
        console.log("Ambito dentro de una function tradicional: " + this + ". Acá el temita está en el contexto del setTimeout, donde no hay nada.");
        
    }, 7000);
}

var randonautica = new alterRandom();