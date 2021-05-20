export class Suma{
    //Declaración de atribs privados, sólo accesibles desde la clase
    private operando1: number; 
    private operando2: number;

    //Constructor de clase
    constructor (operando1: number, operando2: number){
        this.operando1 = operando1;
        this.operando2 = operando2;
    }

    resultado() {
        return this.operando1 + this.operando2;
    }
}