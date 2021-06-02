const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../api/Producto')

const producto = new Producto();

// GET /api/productos/listar me devuelve todos los productos
routerProductos.get('/productos/listar', (req, res)=>{
    respuesta = producto.listar();
    res.json(respuesta);
})

//Devuelvo sólo el producto que coincida con el id pasado a través de params.
routerProductos.get('/productos/listar/:id', (req,res)=>{
    response = producto.listar_id(req.params.id);
    res.json(response)
})

//Guardar a través de POST de un objeto. Utilizo spread operator.
routerProductos.post('/productos/guardar', (req, res)=>{
    productoAgregar = req.body;
    respuesta = producto.agregar(productoAgregar);
    res.json(respuesta);
})

routerProductos.delete('/productos/borrar/:id', (req, res) => {
    response = producto.borrar(req.params.id);
    res.json(response);
})

routerProductos.put('/productos/actualizar/:id', (req, res)=> {
    response = producto.update(req.params.id, req.body);
    res.json(response);
})

module.exports = routerProductos;