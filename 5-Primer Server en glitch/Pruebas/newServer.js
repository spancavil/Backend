const http = require('http');
const port = 8080;

const server = http.createServer((peticion, response)=> {
    
    const hora = new Date().getHours();
    let mensaje = "";
    if (hora >= 6 && hora <= 12) { mensaje = "Buenos días!"}
    else if (hora >= 13 && hora <= 19) { mensaje = "Buenas tardes!"}
    else if (hora >= 20 || hora <= 5) { mensaje= "Buenas noches!"}
    else { mensaje = ""}

    response.end(mensaje);
})

server.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`)
})