const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const dotenv = require('dotenv');
const { fork } = require('child_process');

dotenv.config();

//Le pasamos el puerto por consola
const PORT = process.argv[2];


// Ingresamos credenciales por consola o usamos nuestras credenciales por defecto del archivo .env
const FACEBOOK_CLIENT_ID = process.argv[3] || process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.argv[4] || process.env.FACEBOOK_CLIENT_SECRET;

//Traemos la conn con Atlas
require('./databases/mongoAtlasConn');

//Motor de plantillas EJS
app.set('views', './views');
app.set('view engine', 'ejs');


const session = require('express-session') //Habilitamos las sessions en express
const MongoStore = require('connect-mongo') //Conexión de sesiones con Mongo
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const passport = require('passport'); //Definimos en passport nuestras estrategias de login y signup
const bCrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

//Traemos el model que implementamos con Mongoose
const User = require('./models/users');

// configuramos passport para usar facebook
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: '/login/callback',
  profileFields: ['id', 'displayName', 'photos', 'emails'],
  scope: ['email']
}, function (accessToken, refreshToken, profile, done) {
  console.log(profile);
  let userProfile = profile;
  return done(null, userProfile);
}));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());

//Morgan nos avisará por cada petición sobre nuestro server
app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.use(session({
  store: MongoStore.create({
    //En Atlas connect App :  Make sure to change the node version to 2.2.12:
    mongoUrl: 'mongodb+srv://root:root@cluster0.vchky.mongodb.net/sessions?retryWrites=true&w=majority',
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

app.get('/datos', checkAuth, (req, res) => {
  console.log(req.user)
  res.render('datos', { username: req.user.displayName, photo: req.user.photos[0].value });
})

//logout se accede a través del botón de logout del content.html
app.get('/logout', (req, res) => {
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
    res.redirect('/');
  }
}

//Ruta para v
app.get('/randoms', (req,res)=> {
  res.render('forkProcess');
})

app.post('/compute', (req,res)=> {
  let {cant: cantidadNumeros} = req.body;
  const computo = fork('./libs/funcionRandom');
  computo.send(cantidadNumeros || 10000);
    computo.on('message', valores => {
      console.log("Devolvió el cómputo!");
      res.send(JSON.stringify(valores));
  });
})

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
  console.log('Argumentos de entrada: ', argumentos);
  console.log('Plataforma: ', process.platform);
  console.log('Versión de Node: ', process.version);
  console.log('Uso de memoria: ', process.memoryUsage());
  console.log('Path de ejecución: ', process.argv[0]);
  console.log('Process ID: ', process.pid);
  console.log('Carpeta corriente: ', process.cwd());
  res.send('Send info ok!');
})

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});