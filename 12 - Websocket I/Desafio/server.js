const express = require('express');
const { emit } = require('process');
const app = express();
const http = require('http').Server(app);

// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

// indicamos donde se encuentran los archivos estaticos
app.use(express.static('./public'));

// envio a renderizar el html en la raiz de la misma
app.get('/', (req, res) => {
    res.sendFile('index', { root: __dirname });
});

// cuando se realice la conexion, se ejecutara una sola vez
io.on('connection', socket => {
    console.log("Nuevo cliente conectado!");
    socket.emit('mensaje', "Welcome!");
    // TODO enviar al cliente el mensaje de que se conecto
    // TODO emitir a todos los clientes el mensaje recibido que llega en un evento "mensaje"
    socket.on('change', dataDelInput=>{
        io.sockets.emit('contenido', dataDelInput);
    } )
});

http.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
