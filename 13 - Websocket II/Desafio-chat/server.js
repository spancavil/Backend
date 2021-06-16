const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + "/public"));

const messages = [
    { author: 'Juan', text: '¡Hola! ¿Que tal?' },
    { author: 'Pedro', text: '¡Muy bien! ¿Y vos?' },
    { author: 'Ana', text: '¡Genial!' }
];

io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
    console.log(socket);
    // si el cliente envia un nuevo mensaje, lo guardo y emito
    socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});