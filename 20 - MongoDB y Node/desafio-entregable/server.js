const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const Mensajes = require('./api/Mensajes');
const {routerProductos} = require('./routes/routerProductos');

//Conexion con la db de Mongo;
require('./databases/connMongo');

const PORT = 8081;
const mensajes = new Mensajes;
const defaultMessages = [
    { author: 'Admin', text: 'Desafío chat global y vista de productos utilizando WebSocket en NodeJS' }
];

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Morgan nos avisará por cada petición sobre nuestro server
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use('/api', routerProductos);

//Se envía el archivo index de public
app.get('/', (req,res)=>{
    res.sendFile('index');
})

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado');
    let contenido = await mensajes.leerMensajes();

    //let flag = (producto.productos.length !== 0);
  
    // socket.emit('content', {
    //     hayProductos: flag,
    //     productos: producto.productos
    // })

    socket.emit('messages', contenido)

    // socket.on('contentSent', ()=> {
    //     console.log("Detecto cambios!");
    //     let flag = producto.productos.length !== 0
    //     io.sockets.emit('content', {
    //         hayProductos: flag,
    //         productos: producto.productos
    //     })
    // })

    // si el cliente envia un nuevo mensaje, lo guardo y emito. Debe ser async. porque sino trae promise pending.
    socket.on('new-message', async function (data) {
        console.log("Guardar en server");
        await mensajes.guardarMensajes(data);
        //mensaje.guardarMensajes(data);
        io.sockets.emit('messages', await mensajes.leerMensajes());
    });
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});