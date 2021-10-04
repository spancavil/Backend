const {loggerConsole} = require('../loggers/winston');
const io = new require('socket.io')(server)

const Mensajes = require('./API/Mensajes.js');
const mensajes = new Mensajes()

const Productos = require ('./API/Producto.js');
const productos = new Productos()

//Esto sólo sera accesible una vez loggeado el user

io.on('connection', async socket => {
    loggerConsole.log('debug', 'Nuevo cliente conectado!');
  
    /* Info Productos (ws) */
    /* Envio los mensajes al cliente que se conectó */
  
     socket.emit('productos', await productos.listar());
  
    /* Escucho los mensajes enviado por el cliente y se los propago a todos */
    socket.on('update', async () => {
        io.sockets.emit('productos',  await productos.listar());
  
    })
  
    socket.on('contentSent', ()=> {
      io.sockets.emit('content', {
        
      })
    })
  
    /* Centro de mensajes (ws) */
  
    socket.emit('messages', await mensajes.leerMensajes());
  
    socket.on('new-message', async function (data) {
      console.log(data)
  
      //Si el cuerpo del mensaje incluye administrador, se envía una notificación al admin por SMS
      //data.text.includes('administrador') ? sendSMSTwilio(data) : null;
      await mensajes.guardarMensajes(data);
      let mensajesParaEmitir = await mensajes.leerMensajes();
      io.sockets.emit('messages', mensajesParaEmitir);
    })
});

module.exports = io;