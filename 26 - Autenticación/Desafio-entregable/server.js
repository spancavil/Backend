const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const Mensajes = require('./api/Mensajes');
const {routerProductos} = require('./routes/routerProductos');

app.set('views', './views');
app.set('view engine', 'ejs');

const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const passport = require('passport');
const bCrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

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
  
  var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  }
  
  
  
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
        console.log("Entra aca??")
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
    )
  )

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function (user, done) {
    done(null, user._id);
});
  
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
});

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

app.use(session({
    store: MongoStore.create({
        //En Atlas connect App :  Make sure to change the node version to 2.2.12:
        mongoUrl: 'mongodb+srv://root:root@cluster0.vchky.mongodb.net/sessions?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    ttl: 60 * 60
}))

app.use('/api', routerProductos);

//Se envía el archivo login. Es lo primero que aparece.
app.get('/', (req,res)=>{
    res.render('login');
})

app.get('/signup', (req,res)=>{
  res.render('signup');
})

app.post('/signup', (req,res)=>{
  console.log("entro a POST signup!", req.body);
  passport.authenticate('signup', {failureRedirect: '/failsignup'}), 
  (req, res)=>{
    let user = req.user;
    console.log("TODO OK!")
    res.render(`<h1> Se registró al usuario: ${user.username} correctamente!</h1>`);
  }
})

app.get('/failsignup', (req,res)=>{
  res.send('<h1>Error al registrar al usuario! </h1>');
})
//Endpoint para chequear el login.
app.get('/login', (req,res)=>{
    if(req.query.username === "Jorge"){
        console.log("login correcto");
        req.session.username = "Jorge";
        req.session.admin = true;
        res.send({status:"ok"});
    }else{
        res.send({status: "Invalid username"});
    }
})

//logout se accede a través del botón de logout del content.html
app.get('/logout', (req,res)=>{
    req.session.destroy(err => {
        if (!err) {
            res.redirect('/')
        }
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

//Middleware para chequear que esté loggeado como el username correcto. En caso de no, se envía un 401.
//Además por cada nueva petición se regenera el tiempo de vida de la session.
const auth = (req, res, next) =>{
    console.log (req);
    if (req.session.username === "Jorge" && req.session.admin){
        req.session.regenerate(()=>{
            req.session.username = "Jorge";
            req.session.admin = true;
            console.log(req.session);
            return next();
        })
    }
    else
        return res.sendStatus(401);
}

app.get('/content', auth, (req, res)=>{
    res.sendFile(__dirname + '/public/content.html')
})

app.get('/info', (req, res) => {
    console.log('session', req.session)
    console.log('sessionID', req.sessionID)
    console.log('cookies', req.cookies)
    console.log('sessionStore', req.sessionStore)

    res.send('Send info ok!');
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