const express = require('express');
const morgan = require('morgan');
const {routerProductos, producto} = require('./routes/routerProductos');

const app = express();
const PORT = 8080;

//establecemos la carpeta de las views y el motor a ejs

app.set('views', './views');
app.set('view engine', 'ejs');

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


/*
VISTAS
*/
app.get('/productos/vista', (req,res)=>{
    let flag = producto.productos.length !== 0;
    console.log(flag)
    res.render('vistaProducto', {
        hayProductos: flag,
        productos: producto.productos
    })
})

app.get('/', (req,res)=>{
    res.render('vistaFormulario')
})


const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

server.on('error', ()=>{
    console.log('Oops an error ocurred.');
})