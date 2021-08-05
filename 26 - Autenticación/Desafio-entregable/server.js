const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');

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
const LocalStrategy = require('passport-local').Strategy;

//Traemos el model que implementamos con Mongoose
const User = require('./models/users');

passport.use('login', new LocalStrategy({
  passReqToCallback: true
},
  function (req, username, password, done) {
    // check in mongo if a user with username exists or not
    User.findOne({ 'username': username },
      function (err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username ' + username);
          return done(null, false,
            //req.flash('message', 'User Not found.'));                 
            console.log('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false,
            //req.flash('message', 'Invalid Password'));
            console.log('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
  })
);

const isValidPassword = function (user, password) {
  return bCrypt.compareSync(password, user.password);
}
passport.use('signup', new LocalStrategy(
  { passReqToCallback: true },
  function (req, username, password, done) {
    findOrCreateUser = function () {
      // find a user in Mongo with provided username
      User.findOne({ 'username': username }, function (err, user) {
        // In case of any error return
        if (err) {
          console.log('Error in SignUp: ' + err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false,
            //req.flash('message','User Already Exists'));
            console.log('message', 'User Already Exists'));
        } else {
          console.log("Dentro de passport!")
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.firstName = req.body.firstName;
          newUser.lastName = req.body.lastName;
          newUser.email = req.body.email;

          // save the user
          newUser.save(function (err) {
            if (err) {
              console.log('Error in Saving user: ' + err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    }
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  }
)
)

var createHash = function (password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const PORT = 8081;

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

app.get('/signup', (req, res) => {
  res.render('signup');
})

app.post('/signup',
  passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/successsignup' }),
)

app.get('/failsignup', (req, res) => {
  res.send('<h1>Error al registrar al usuario! </h1>');
})

app.get('/successsignup', (req, res)=> {
  res.render(`successsignup`);
})

//Endpoint para chequear el login.
app.post('/login',
  passport.authenticate('login', {failureRedirect: '/failsignin', successRedirect: '/datos'})
);

app.get('/datos', checkAuth, (req, res) =>{
  res.render('datos', {username: req.user.username});
})

//logout se accede a través del botón de logout del content.html
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

app.get('/failsignin', (req,res)=>{
  res.render('failsignin');
})

//Middleware para chequear que esté loggeado como el username correcto. En caso de no, se envía un 401.
//Además por cada nueva petición se regenera el tiempo de vida de la session.
function checkAuth (req, res, next){
  if (req.isAuthenticated()){
      next();
  } else {
      res.redirect('/');
  }
}

app.get('/info', (req, res) => {
  console.log('session: ', req.session)
  console.log('sessionID: ', req.sessionID)
  console.log('cookies: ', req.cookies)
  console.log('user: ', req.user)

  res.send('Send info ok!');
})

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});