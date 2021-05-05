//Declaramos una función que tendrá un import dinámico mediante la palabra reservada async.

async function operacion (num1: number, num2: number, cadena: string){

    let cadenaFormatted: string = cadena.toLocaleLowerCase(); //Transformamos a lowercase la cadena.
    switch (cadenaFormatted) {

        case "suma":
            const path1 = await import('./suma');
            let operacionSuma = new path1.Suma(num1, num2); //necesito llamar a la clase Suma del path1

            let promesa1 = new Promise ((acc, rej)=>{ //Generamos una nueva promesa que siempre dará accept
                setTimeout(() => {                     //Simulamos una espera asíncrona con el servidor
                    acc(operacionSuma.resultado())     //Finalmente cuando termina el timeout, devuelve el resultado.
                }, 2000);
            })

            return promesa1; //Devolvemos la promesa
            break;

        case "resta":   //Idem suma
            const path2 = await import('./resta');
            let operacionResta = new path2.Resta(num1, num2)
            
            let promesa2 = new Promise ((acc, rej)=>{
                setTimeout(() => {
                    acc(operacionResta.resultado())
                }, 3000);
            })

            return promesa2;
            break;

        default:
            let promesa3 = new Promise ((acc, rej)=>{
                setTimeout(() => {
                    acc("No es una operación válida")
                }, 4000);
            })

            return promesa3
            break;
        
    }
}

const operaciones = () => {

    console.log ("Loading...");
    
    let suma1 = operacion(22,32, "SUMA");
    suma1.then(response=> console.log(response));

    let resta1 = operacion(22.23, 88.28, "rEsTa");
    resta1.then(response=> console.log(response));

    let operacionNoValida = operacion (332, 221, "EstoNoExiste");
    operacionNoValida.then(response => console.log(response));
}

operaciones();
