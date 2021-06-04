import express from 'express';
import fs from 'fs';

const app = express();

app.engine('cte', (filePath, options, callbackFn)=> {

    //Leemos el contenido de las plantillas que le pasamos por parámetro
    fs.readFile(filePath, (err, content)=> {
        //Chequeamos errores
        if (err) return callbackFn(new Error(err));

        let rendered = content.toString();
        for(let key in options){
            if (typeof options[key] == 'string' || typeof options[key]== 'number'){
                rendered = rendered.replace (`^^${key}$$`, `${options[key]}`);
            }
        }
        return callbackFn(null, rendered);
    })
})

app.set('views', './views');
app.set('view engine', 'cte'); 

app.get('/cte1', (req, res) => {
    res.render('template1', { titulo: 'Custom Template Engine', mensaje: 'Lorem ipsum ...', autor: 'DS', version: 12345 });
});

app.get('/cte2', (req, res) => {
    res.render('template2', { nombre: 'Daniel', apellido: 'Sánchez', FyH: new Date().toLocaleString() });
});

app.get('/cte3', (req, res) => {
    res.render('template3', { nombre: 'Roberto', apellido: 'Sánchez', FyH: new Date().toLocaleString() });
});

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))