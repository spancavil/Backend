const express = require('express');
const morgan = require('morgan');
const routerProductos = require('./routes/routerProductos');

const app = express();
const PORT = 8080;

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

//Atajamos todos los posibles errores del server
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Oops! something went wrong...');
});

// Usamos los archivos de la carpeta public
app.use(express.static('public'));

//Usamos las routes definidas por router
app.use('/api', routerProductos);

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', ()=>{
    console.log('Oops an error ocurred.');
})