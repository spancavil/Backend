const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const dotenv = require('dotenv');
const random = require('./libs/funcionRandom')

//Funciones para envío de mail y sms modularizadas
const {sendMailEthereal, sendMailGmail} = require ('./libs/nodeMailer')
const sendSMSTwilio = require('./libs/twilio');

dotenv.config();

const destinatario = process.env.DESTINATARIO;

//Desafio 31 - compression && loggers
const compression = require('compression')
const {loggerConsole, loggerWarn, loggerError} = require('./loggers/winston');

const io = new require('socket.io')(server)

const Mensajes = require('./API/Mensajes.js');
const mensajes = new Mensajes()

const Productos = require ('./API/Producto.js')
const productos = new Productos()

const numCPUs = require('os').cpus().length;

//Le pasamos el puerto por consola
const PORT = process.argv[2] || 8081;

//Importamos el passport
const passport = require('./passport/passportFacebook')

//Traemos la conn con Atlas
require('./databases/mongoAtlasConn');

//Motor de plantillas EJS
app.set('views', './views');
app.set('view engine', 'ejs');


const session = require('express-session') //Habilitamos las sessions en express
const MongoStore = require('connect-mongo') //Conexión de sesiones con Mongo
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

//Traemos el model que implementamos con Mongoose
const User = require('./models/users');
const { routerProductos } = require('./routes/routerProductos');


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
app.use('/api', routerProductos)

//Se envía el archivo login. Es lo primero que aparece.
app.get('/', (req, res) => {
  res.render('login');
})

//Endpoint para chequear el login.
app.get('/login',
  passport.authenticate('facebook')
);

app.get('/login/callback', passport.authenticate('facebook',
  {
    successRedirect: '/datos',
    failureRedirect: '/failsignin'
  }
));

//Renderización de datos y mensajes
app.get('/datos', checkAuth, async (req, res) => {

  loggerWarn.log('warn', `El usuario ${req.user.displayName} con id: ${req.user.id} ingresó a /datos`);

  //Envío de mail a través de nodemailer
  const mailOptions = {
    from: 'Servidor Node.js',
    to: destinatario,
    subject: `Log in de: ${req.user.displayName} con id: ${req.user.id}. Horario: ${new Date().toLocaleString()}`,
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
  }
  sendMailEthereal(mailOptions);
  mailOptions.html = `<h3>Foto del usuario loggeado: </h3><img src=${req.user.photos[0].value}>`;
  sendMailGmail(mailOptions);

  let productosDB = await productos.listar();
  let hayProductos = false;
  productosDB.error ? null : hayProductos = true;

  res.render('datos', { 
    username: req.user.displayName,
    photo: req.user.photos[0].value,
    hayProductos: hayProductos,
    productos: productosDB
  });
})

//logout se accede a través del botón de logout del content.html
app.get('/logout', (req, res) => {

  //Envío del mail a través de nodemailer
  const mailOptions = {
    from: 'Servidor Node.js',
    to: destinatario,
    subject: `Log out de: ${req.user.displayName} con id: ${req.user.id}. Horario: ${new Date().toLocaleString()}`,
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
  }
  sendMailEthereal(mailOptions);
  mailOptions.html = `<h3>Foto del usuario desloggeado: </h3><img src=${req.user.photos[0].value}>`;
  sendMailGmail(mailOptions);

  req.logout();
  res.redirect('/');
})

app.get('/failsignin', (req, res) => {
  res.render('failsignin');
})

//Middleware para chequear que esté loggeado como el username correcto. En caso de no, se envía un 401.
//Además por cada nueva petición se regenera el tiempo de vida de la session.
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    loggerWarn.log("warn", "Se intento ingresar a /datos sin autenticación")
    res.redirect('/');
  }
}

//Ruta para la vista de generar randoms
app.get('/randoms', (req, res) => {
  res.render('forkProcess');
})

//Se computa la cantidad de números random
app.post('/compute', (req, res) => {
  let { cant: cantidadNumeros } = req.body;

  //Agregamos un warn en caso que la cantidad supere cierto valor
  cantidadNumeros > 1e6 && loggerWarn.log('warn', "La cantidad de numeros es mayor a 1e6. El server podría quedar sobrecargado.");

  let valores = random(cantidadNumeros); //Lo hacemos sin fork.
  res.send(JSON.stringify(valores));
});

app.get('/info', (req, res) => {
  /* 
  Info de la session
  console.log('session: ', req.session)
  console.log('sessionID: ', req.sessionID)
  console.log('cookies: ', req.cookies)
  console.log('user: ', req.user)
 */
  let argumentos = [];
  for (let index = 2; index < process.argv.length; index++) {
    let argumento = process.argv[index];
    argumentos.push(argumento);
  }

  res.render('info', {
    entrada: argumentos.toString(),
    plataforma: process.platform,
    version: process.version,
    memoria: JSON.stringify(process.memoryUsage(), null, '\t'),
    path: process.argv[0],
    pid: process.pid,
    current: process.cwd(),
    nrocpus: numCPUs
  })

})

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
    data.text.includes('administrador') ? sendSMSTwilio(data) : null;
    await mensajes.guardarMensajes(data);
    let mensajesParaEmitir = await mensajes.leerMensajes();
    io.sockets.emit('messages', mensajesParaEmitir);
  })
});

server.listen(PORT, () => {
  loggerConsole.log('debug', `Servidor escuchando en http://localhost:${PORT}`);
});