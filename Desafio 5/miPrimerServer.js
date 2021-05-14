const http = require('http');
const port = 3000;

function obtenerRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function obtenerRandom09999(){
    return (Math.random() * 1000).toFixed(2);
}

const armadoObjeto = () => {
    numeroRandom = obtenerRandom(1,10);
    numeroRandom2 = obtenerRandom09999();
    return JSON.stringify({
                    id: numeroRandom, 
                    title: `Producto ${numeroRandom}`,
                    price: numeroRandom2,
                    thumbnail : `Foto  + ${numeroRandom}`
                })
}

const server = http.createServer((request, response)=>{
    miObjeto = armadoObjeto();
    console.log("New request!");
    console.log("Object sent: ", miObjeto);
    response.end(miObjeto);
})

server.listen(port, ()=> {
    console.log("Server listening at http://localhost:" + port)
})
