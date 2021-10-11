const RouterProductos = require('koa-router');

const routerProductos = new RouterProductos ({
    prefix: '/api/productos'
})

const Producto = require ('../API/Producto')

const producto = new Producto();

// GET /api/productos/listar me devuelve todos los productos
routerProductos.get('/listar', async (ctx, next) => {
    let respuesta = await producto.listar();
    ctx.body = respuesta;
    next()
})

//Devuelvo sólo el producto que coincida con el id pasado a través de params.
routerProductos.get('/listar/:id',  async (ctx, next)=>{
    let response = await producto.listarId(ctx.params.id);
    ctx.body = response;
    next()
})

//Guardar a través de POST de un objeto. Utilizo spread operator.
routerProductos.post('/guardar', async (ctx, next)=>{
    let productoAgregar = ctx.request.body;
    let respuesta = await producto.agregar(productoAgregar);
    ctx.body = respuesta;
    next();
})

routerProductos.delete('/borrar/:id', async (ctx, next) => {
    let response = await producto.borrar(ctx.params.id);
    ctx.body = response;
    next();
})

routerProductos.put('/actualizar/:id', async (ctx ,next)=> {
    let response = await producto.update(ctx.params.id, ctx.request.body);
    ctx.body = response;
    next();
})

module.exports = {routerProductos};