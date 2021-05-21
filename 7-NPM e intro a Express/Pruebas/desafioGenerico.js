const express = require('express');
const moment = require('moment');
// creo una app de tipo express
const app = express();

const puerto = 8080;
let contador = 0;

// defino la ruta / con GET
app.get('/', (req, res) => {
    console.log('Se hizo un request.');
    res.send('<h1 style="color:blue;"> Bienvenido al servidor de Express</h1>');
});

app.get('/visitas', (req, res) => {
    contador ++;
    console.log('Se hizo un request a /visitas');
    res.send(`<h1> Cantidad de visitas: ${contador}.</h1>`);
});

app.get('/fyh', (req, res) => {
    const fecha = moment().format('DD/MM/YYYY');
    const hora = moment().format('HH:mm:ss')
    contador ++;
    console.log('Se hizo un request a /visitas');
    res.send(`<h1> Fecha y hora actual: ${fecha}, ${hora}.</h1>`);
});
// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});