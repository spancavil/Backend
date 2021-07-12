import express from 'express'
const router = express.Router();
import Productos from '../api/productos.js'
let productos = new Productos()

router.get('/listar', async (req,res) => {
    try{
        res.json(await productos.listarAll())
    }catch (error) {
        res.status(500).send({ error: error });
    }

})

router.get('/listar/:id', async (req,res) => {
    try{
        let { id } = req.params
        res.json(await productos.listar(id))
    }catch (error) {
        res.status(500).send({ error: error });
    }

})

router.post('/guardar', async (req,res) => {
    try{
        let producto = req.body
        await productos.guardar(producto)
        res.json(producto)
    }catch (error) {
        res.status(500).send({ error: error });
    }

})

router.put('/actualizar/:id', async (req,res) => {
    try{
        let { id } = req.params
        let producto = req.body
        let result = await productos.actualizar(producto,id)
        res.json(result)
    }catch (error) {
        res.status(500).send({ error: error });
    }

})

router.delete('/borrar/:id', async (req,res) => {
    let { id } = req.params
    try{
        await productos.borrar(id)
        res.json({message: 'success'})
    }catch (error) {
        res.status(500).json({error: error })
    }

})

router.get('/vista', async (req, res) => {
    try{
        let prods = await productos.listarAll()

        res.render("vista", {
            productos: prods,
            hayProductos: prods.length
        })
    }catch (error) {
        res.status(500).send({ error: error });
    }

});

export default router;