/**
 * Desafio generico - operaciones con el servidor - 5 minutos
 * sumar numeros pasados de diferentes maneras en el get e implementar post, put y delete
 */
 const express = require('express');

 // creo una app de tipo express
 const app = express();
 const puerto = 8080;
 
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 app.get('/', (req, res) => {
     res.send('Bienvenido al desafio de operaciones');
 });
 
 // GET desde el client: localhost:8080/sumar/5/6
 app.get('/api/sumar/:num1/:num2', (req, res) => {
    let {num1, num2} = req.params;
    res.send(`${parseInt(num1)+parseInt(num2)}`);
 });
 
 // GET desde el client: localhost:8080/sumar?num1=5&num2=62
 app.get('/api/sumar', (req, res) => {
    let num1 = req.query.num1;
    let num2 = req.query.num2;
    res.send(`La suma de ${num1} + ${num2} es : ${parseInt(num1) + parseInt(num2)}`);
 });
 
 // GET desde el client: localhost:8080/api/operacion/5+6 o la operación que yo quiera ejecutable desde JS
 // por ejemplo console.log("Hola estoy ejecutando algo desde el cliente en el server.")
 app.get('/api/operacion/:operacion', (req, res) => {
    let resultado = parseFloat(eval(req.params.operacion)) //Ejecuta lo que yo le diga que haga, o sea lo toma como un código JS
    res.send(`${resultado}`);
 });

 //Debe hacerse desde POSTMAN
 app.post('/api', (req, res) => {
    console.log(req.body); //Ya en el body obtenemos el objeto parseado.
    res.send("OK POST");
 });
 
 //Modificamos un registro específico. Obviamente desde POSTMAN.
 app.put('/api/:id', (req, res) => {
    console.log(req.body);
    res.send({
       result:"ok",
       id: req.params.id,
       body: req.body
    });
 });
 
 app.delete('/api/:id', (req, res) => {
    console.log(req.body);
    res.send("Ok Delete");
 });
 
 // pongo a escuchar el servidor en el puerto indicado
 const server = app.listen(puerto, () => {
     console.log(`servidor escuchando en http://localhost:${puerto}`);
 });
 
 // en caso de error, avisar
 server.on('error', error => {
     console.log('error en el servidor:', error);
 });