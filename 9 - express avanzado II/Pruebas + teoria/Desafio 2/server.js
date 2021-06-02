const express = require('express');

// creo una app de tipo express
const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// indico donde estan los archivos estaticos
//Por defecto cuando hago get / me trae el index.html del public.
app.use(express.static('public'));

/* ------------------MASCOTAS--------------------------- */

const routerMascotas = express.Router();
const mascotas = [];

routerMascotas.get("/listar", (req, res)=>{
    res.json(mascotas);
})

routerMascotas.post("/guardar", (req,res)=>{
    mascotas.push(req.body);
    res.json(req.body);
})
// completar...

/* -------------------PERSONAS-------------------------- */
const routerPersonas = express.Router();
const personas = [];

routerMascotas.get("/listar", (req, res)=>{
    res.json(personas);
})

routerMascotas.post("/guardar", (req,res)=>{
    personas.push(req.body);
    res.json(req.body);
})

// agrego los prefijos
app.use('/mascotas', routerMascotas);
app.use('/personas', routerPersonas);

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});