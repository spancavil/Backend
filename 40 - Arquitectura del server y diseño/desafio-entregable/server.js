const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const passport = require('./passport/passportFacebook')

const {loggerConsole} = require('./loggers/winston');
const io = new require('socket.io')(server)

const Mensajes = require('./API/Mensajes.js');
const mensajes = new Mensajes()

const Productos = require ('./API/Producto.js');
const productos = new Productos()

//Le pasamos el puerto por consola
const PORT = process.argv[2] || 8081;

//Desafio 31 - compression && loggers
const compression = require('compression')

//Traemos la conn con Atlas
require('./databases/mongoAtlasConn');

//Motor de plantillas EJS
app.set('views', './views');
app.set('view engine', 'ejs');

const session = require('express-session') //Habilitamos las sessions en express
const MongoStore = require('connect-mongo') //Conexión de sesiones con Mongo
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

//Traemos el model que implementamos con Mongoose
const { routerProductos } = require('./routes/routerProductos');
const routerHome = require('./routes/routeHome');
const routerGraph = require('./routes/graphql');

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());

//Morgan nos avisará por cada petición sobre nuestro server
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use(session({
  store: MongoStore.create({
    //En Atlas connect App :  Make sure to change the node version to 2.2.12:
    mongoUrl: process.env.MONGO_CONNECTION,
    mongoOptions: advancedOptions
  }),
  secret: 'secret',
  rolling: true,
  resave: false,
  saveUninitialized: false,
  ttl: 60 * 60
}))

app.use(express.urlencoded({ extended: true }));

//Inicializamos el middleware luego de inicializar express-session
app.use(passport.initialize());
app.use(passport.session());

app.use(compression())

//Definimos las rutas
app.use('/api', routerProductos)
app.use('/', routerHome);
app.use('/graphql', routerGraph);

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

    //Si el cuerpo del mensaje incluye administrador, se envía una notificación al admin por SMS
    data.text.includes('administrador') ? sendSMSTwilio(data) : null;
    await mensajes.guardarMensajes(data);
    let mensajesParaEmitir = await mensajes.leerMensajes();
    io.sockets.emit('messages', mensajesParaEmitir);
  })
});

server.listen(PORT, () => {
  loggerConsole.log('debug', `Servidor escuchando en http://localhost:${PORT}`);
});