const Server = require('../serverExpress')(8080); //Montamos un server express en el puerto 8080

Server.app.get('/', (req,res)=>{
    res.send(`<h1> Hola! </h1>`)
})