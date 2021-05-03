var i = 5;

const unaFuncion = function() {
    var i = 2;
        if(i==2){
            var i = 3; //ESTA VAR SE DECLARA Y VALE PARA TODA LA FUNCION, EL 2 LO PISARIA
            console.log(i);
            var j = 6;
        }
    console.log(i);
    console.log(j); //IMPRIME 6 PORQUE VALE PARA TODA LA FUNC
}

unaFuncion();
console.log(i);
//console.log(j); //UNDEF




