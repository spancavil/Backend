const express = require('express');
const { loggerWarn } = require('../loggers/winston');
const routerHome = express.Router();
const passport = require('../passport/passportFacebook')

//Funciones para envío de mail y sms modularizadas
const {sendMailEthereal, sendMailGmail} = require ('../libs/nodeMailer');
const funcionRandom = require('../libs/funcionRandom');
const Producto = require('../API/Producto');
const { producto } = require('./routerProductos');

const productos = new Producto;

const destinatario = process.env.DESTINATARIO;

const numCPUs = require('os').cpus().length;


//Se envía el archivo login. Es lo primero que aparece.
routerHome.get('/', (req, res) => {
    res.render('login');
})

//Endpoint para chequear el login.
routerHome.get('/login',
    passport.authenticate('facebook')
);

routerHome.get('/login/callback', passport.authenticate('facebook',
    {
        successRedirect: '/datos',
        failureRedirect: '/failsignin'
    }
));

//Renderización de datos y mensajes
routerHome.get('/datos', checkAuth, async (req, res) => {

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
routerHome.get('/logout', (req, res) => {

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

routerHome.get('/failsignin', (req, res) => {
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
routerHome.get('/randoms', (req, res) => {
    res.render('forkProcess');
})

//Se computa la cantidad de números random
routerHome.post('/compute', (req, res) => {
    let { cant: cantidadNumeros } = req.body;

    //Agregamos un warn en caso que la cantidad supere cierto valor
    cantidadNumeros > 1e6 && loggerWarn.log('warn', "La cantidad de numeros es mayor a 1e6. El server podría quedar sobrecargado.");

    let valores = funcionRandom(cantidadNumeros); //Lo hacemos sin fork.
    res.send(JSON.stringify(valores));
});

routerHome.get('/info', (req, res) => {
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

module.exports = routerHome;
