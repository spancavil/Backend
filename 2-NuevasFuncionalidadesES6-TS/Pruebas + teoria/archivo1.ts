class Animal {
    protected name: string; //Atributo del objeto Animal, que debe ser un string.
    protected constructor (theName: string) {
        this.name = theName
    }
    public beberAgua () {
        return `Glup glup glup`;
    }
}

class Perro extends Animal {
    private raza: string;
    constructor (name: string, raza: string){
        super(name);
        this.raza = raza;
    }

    public ladrar(intensidad: number) {
        if (intensidad <=2 ) {
            return `guau ...(Ladro despaciito!)`;
        } else if (intensidad < 6 ){
            return `guau guau ... (Ladro normal)`;
        } else {
            return `GUAU GUAU GUAU !! (Ladro con todo!!)`;
        }
    }
}

let Mocho = new Perro ("Mocho", "pug");

console.log(Mocho.beberAgua());

console.log(Mocho.ladrar(8));