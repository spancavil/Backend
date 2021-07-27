const { response } = require('express');
const express = require ('express');
const routerProductos = express.Router();

const Producto = require ('../api/Producto')

const producto = new Producto();

// GET /api/productos/listar me devuelve todos los productos
routerProductos.get('/productos/listar', async (req, res)=>{
    let respuesta = await producto.listar();
    res.json(respuesta);
})

//Devuelvo sólo el producto que coincida con el id pasado a través de params.
routerProductos.get('/productos/listar/:id', async (req,res)=>{
    let response = await producto.listarId(req.params.id);
    res.json(response)
})

//Guardar a través de POST de un objeto. Utilizo spread operator.
routerProductos.post('/productos/guardar', async (req, res)=>{
    let productoAgregar = req.body;
    let respuesta = await producto.agregar(productoAgregar);
    res.json(respuesta);
})

routerProductos.delete('/productos/borrar/:id', async (req, res) => {
    let response = await producto.borrar(req.params.id);
    res.json(response);
})

routerProductos.put('/productos/actualizar/:id', async (req, res)=> {
    let response = await producto.update(req.params.id, req.body);
    res.json(response);
})

module.exports = {routerProductos, producto};