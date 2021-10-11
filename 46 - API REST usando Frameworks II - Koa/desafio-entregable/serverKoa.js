const config = require('./config/data');

const Koa = require('koa');
const app = new Koa();

const koaBody = require('koa-body');
const morgan = require('koa-morgan');

const {loggerConsole} = require('./loggers/winston');

require('./databases/mongoAtlasConn');

app.use(koaBody())

const { routerProductos } = require('./routes/routerProductos');

//Morgan nos avisará por cada petición sobre nuestro server
app.use(morgan('dev'));

//Definimos las rutas
app.use(routerProductos.routes())

const server = app.listen(config.PORT, () => {
  loggerConsole.log('debug', `Servidor Koa escuchando en el puerto ${config.PORT}`)
})

server.on('error', error => loggerConsole.log('debug', 'Error en Servidor Koa:',error))