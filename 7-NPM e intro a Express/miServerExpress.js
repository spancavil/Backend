const express = require ('express');
const morgan = require('morgan');
const fs = require('fs');

const port = 8080;
let counterA = 0;
let counterB = 0;
const app = express();
const path = './productos.txt';

//Loggeamos todos los request de la app por consola con Morgan.
app.use(morgan('tiny'));

app.get('/items', (req, res)=> {
    counterA++;
    fs.promises.readFile(path).then((data)=>{
        parsedItems = JSON.parse(data);
        let productos = [];
        let cantidad = 0;

        parsedItems.forEach(element => {
            productos.push(element.title);
            cantidad ++;
        });

        res.json({
            items: productos, cantidad: cantidad
        })
    })
    .catch(error => {
        console.log ("No existe el archivo!");
    })
})

app.get('/item-random', (req, res) => {
    counterB++;
    let randomNumber = Math.ceil( Math.random() * (21-1) ) - 1;

    fs.promises.readFile(path).then((data)=>{
        parsedItems = JSON.parse(data);
        res.json({
            item: parsedItems[randomNumber]
        })
    })
    .catch(error => {
        console.log ("No existe el archivo!");
    });
})

app.get('/visitas', (req, res) => {
    res.json({
        visitas: {items: counterA, item: counterB}
    })
})

const server = app.listen(port, () => {
    console.log(`Server listening at: http://localhost.${port}`);
})

server.on('error', error => {
    console.log('Error at server: ', error);
})