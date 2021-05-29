const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 8080;
const productos = [];

//Necesitamos agregar estas dos líneas para que me lea los JSON que vienen desde POSTMAN. Caso contrario no los puede leer.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('tiny'));

// Get / devuelve un msj de bienvenida.
app.get('/', (req , res)=>{
    res.send("Welcome!");
})

// GET /api/productos/listar me devuelve todos los productos
app.get('/api/productos/listar', (req, res)=>{
    if (productos.length === 0){
        res.send({error: "No hay productos cargados"});
    }
    else{
        console.log(productos)
        res.send(JSON.stringify(productos, null, '\t'));
    }
})

//Devuelvo sólo el producto que coincida con el id pasado a través de params.
app.get('/api/productos/listar/:id', (req,res)=>{
    let producto = productos.find(element => element.id === parseInt(req.params.id));
    if (producto){
        res.send(JSON.stringify(producto, null, '\t'));
    } else {
        res.send({error: "Producto no encontrado."});
    }
})

//Guardar a través de POST de un objeto. Utilizo spread operator.
app.post('/api/productos/guardar', (req, res)=>{
    let objeto = {...req.body, 
                    id: productos.length + 1}
    productos.push(objeto);
    res.send({objeto});
})

const server = app.listen(PORT, ()=>{
    console.log('Server listening at http://localhost:' + PORT);
})

server.on('error', ()=>{
    console.log('Oops an error ocurred.');
})
