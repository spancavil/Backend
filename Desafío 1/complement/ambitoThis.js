let numeroRandom = 20

function alterRandom () {
    this.numeroRandom = 40;

    setTimeout(() => {

        console.log("Ambito dentro de function con arrow function: " + this.numeroRandom);
        
    }, 2000);

    setTimeout(function (){

        console.log("Ambito dentro de una function tradicional: " + this.numeroRandom);
        
    }, 4000);
}

var randonautica = new alterRandom();