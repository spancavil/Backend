const express = require('express');
const morgan = require('morgan');
const {routerProductos, producto} = require('./routes/routerProductos');
const app = express();

const http = require('http').Server(app);
// le pasamos la constante http a socket.io
const io = require('socket.io')(http);

const PORT = 8080;

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Morgan nos avisará por cada petición sobre nuestro server
app.use(morgan('dev'));

//Atajamos todos los posibles errores del server
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! something went wrong...');
});

// Usamos los archivos de la carpeta public
app.use(express.static('public'));

//Usamos las routes definidas por router
app.use('/api', routerProductos);

//Se envía el archivo index de public
app.get('/', (req,res)=>{
    res.sendFile('index');
})

//Manejos de conexiones con el cliente
io.on('connection', socket => {

    //Cada vez que un cliente se conecta le envía los datos de productos
    let flag = producto.productos.length !== 0;
    console.log("Nuevo cliente conectado!");
    socket.emit('content', {
        hayProductos: flag,
        productos: producto.productos
    })
    //Cada vez que recibe el evento contentSent del cliente, reenvía los datos de productos a todos los clientes conectados
    socket.on('contentSent', ()=> {
        console.log("Detecto cambios!");
        let flag = producto.productos.length !== 0
        io.sockets.emit('content', {
            hayProductos: flag,
            productos: producto.productos
        })
    })
})

//Escuchamos las peticiones utilizando http sobre la app de express
http.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});