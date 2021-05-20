const funcion1 = (funcionCallback) => {
    Math.random() < 0.5 ? 
        funcionCallback("No hay error funcion 1."):
        funcionCallback(new Error);
}

const funcion2 = (funcionCallback) => {
    Math.random() < 0.5 ? 
        funcionCallback("No hubo error funcion 2"):
        funcionCallback(new Error);
}

//Está implícito el callback.
funcion1 ( (result)=> {
    if(result == new Error){
        console.log("Se picó el paso 1.");
        console.log(error);
    }
    else{
        console.log("Sin error en el paso 1");
        funcion2((result)=>{
            if(result === new Error){
                console.log("Se jodió el paso 2.");
                }
            else{
                console.log ("Fin del callback Hell.");
            }
        })
    }
})