
function Persona (nombre){
    this.nombre = nombre;
}

Persona.prototype.saludar = () => {
    console.log("Hola mi nombre es: " + this.nombre);
}

Persona.prototype.saludar2 = function(){
    console.log("Hola mi nombre es: " + this.nombre);
}

let pepe = new Persona("Pepe");
pepe.saludar();
pepe.saludar2();
