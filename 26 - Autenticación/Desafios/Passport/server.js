const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');

const users = []; //los usuarios se guardan en memoria.
let globalId = 0; //contador para el id.

//Middleware para login
passport.use('login', new LocalStrategy({
    passReqToCallback: true
},
    function (req, username, password, done) {
        let usuario = users.find(usuario => usuario.username === username);

        if (!usuario) {
            console.log("user not found: ", username);
            return done(null, false, console.log('user not found'))
        } else if (!isValidPassword(usuario, password)) {
            console.log('invalid password');
            return done(null, false, console.log("invalid password"))
        } else {
            return done(null, usuario);
        }
    }
));

//Middleware para signup
passport.use("signup", new LocalStrategy({
    passReqToCallback: true
}, function (req, username, password, done) {
    console.log("entro a la strategy")
    let usuario = users.find(usuario => usuario.username === username);
    if (usuario) {
        console.log('username already exists');
        return done(null, false, console.log("username already exists"))
    } else {
        let newUser = {
            id: ++globalId,
            username: username,
            password: createHash(password),
            rol: req.body.rol
        }

        users.push(newUser);
        return done(null, newUser);
    }
})
);

//Serializando mi username. Retornamos su id.
passport.serializeUser((username, done)=>{
    done(null, username.id)
})

//Deserializamos a nuestro user, ingresamos el id y nos devuelve el user 
passport.deserializeUser((id, done)=> {
    let usuario = users.find(usuario => usuario.id === id);
    return done(null, usuario);
})

//Funciones adicionales con bcrypt

//Compara nuestro password (no hasheado) contra el password del usuario de la base de datos. Retorna
//true en caso de match
const isValidPassword = (user, password) => {
    console.log(user.password, password);
    return bcrypt.compare(password, user.password);
}

//Creamos el password hasheado para guardarlo en la db (y que no esté en texto plano)
const createHash = (password) => {
    const encrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    console.log(encrypted);
    return encrypted;
}

//SERVER
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(require('express-session')({
    secret: "ultra-secreto",
    resave: true,
    saveUninitialized: false
}));

//inicializando passport
app.use(passport.initialize());
app.use(passport.session());

//Middlewares

//De auth
function checkAuth (req, res, next){
    if (req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
}

//De admin
function roleAdmin (req, res, next){
    console.log('>', req.user);
    if (req.isAuthenticated() && req.user.rol == "admin"){
        next();
    } else {
        res.status(401).send('Not authorized');
    }
}

app.get('/', (req,res)=> {
    res.send('<h1>Bienvenidos al server express con auth y passport!</h1>')
})

//Clave el login, utilizamos el middleware de passport para autenticar, usando la estrategia
//previamente definida: la del login. En caso de fallo, redirecciona a fail login.
app.post('/login', 
    passport.authenticate('login', {failureRedirect: "/faillogin"}),
    (req, res)=>{
        res.send(req.body);
})

app.post('/faillogin', (req, res)=>{
    res.status(400).send({ error: 'Invalid username/password' });
});

//Similar que el login es para el signup.
app.post ('/signup', 
    passport.authenticate('signup', {failureRedirect: "/failsignup"}), 
    (req, res)=>{
        res.send(req.body);
});

app.post('/failsignup', (req, res) => {
    res.status(400).send({ error: 'Signup failed.'});
});

//Datos accesibles sólo pasando la autenticación del middleware.
app.get('/datos', checkAuth, (req, res) => {
    res.send('<h1>Datos protegidos por middleware. Aqui tienes archivos en pdf: .... </h1>');
});

app.get('/datos/admin', roleAdmin, (req, res) => {
    res.send('<h2>datos que solo el admin puede ver. Aquí tienes todos los usuario registrados: </h2>');
});

app.get('/info', (req,res)=>{
    res.send({...users})
})

//Nos deslogueamos
app.delete('/logout', (req, res) => {
    req.logout();
    res.send({ logout: 'ok' });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor express escuchando en http://localhost:${PORT}`)
});