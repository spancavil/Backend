import express from 'express'
const app = express()

import handlebars from 'express-handlebars'
import routes from "./routes/index.js"

import http from 'http'
import { Server as Socket } from 'socket.io'
const server = http.Server(app)
const io = new Socket(server)

import Productos from './api/productos.js'
const productos = new Productos()

import Mensajes from './api/mensajes.js'
const mensajes = new Mensajes()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

//ruta principal
app.use('/api', routes)

//establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");


/* -------------------- Web Sockets ---------------------- */
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    /* Info Productos (ws) */
    /* Envio los mensajes al cliente que se conectó */
    socket.emit('productos', await productos.get());

    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', async () => {
        io.sockets.emit('productos',  await productos.get());

    })

    /* Centro de mensajes (ws) */

    socket.emit('messages', await mensajes.getAll());

    socket.on('new-message', async function(data) {
            await mensajes.guardar(data);
            let mensajesParaEmitir = await mensajes.getAll();
            io.sockets.emit('messages', mensajesParaEmitir);


    })
});
/* ------------------------------------------------------- */

const PORT = process.env.PORT || 8082;
const srv = server.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${srv.address().port}`)
})
srv.on("error", error => console.log(`Error en servidor ${error}`))
