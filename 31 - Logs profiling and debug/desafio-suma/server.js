const express = require('express');
const morgan = require('morgan');
const log4js = require('log4js');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

log4js.configure({
    appenders: {
        loggerConsole: {type: "console"},
        loggerError: {type: "file", filename: "erroresSuma.log"}
    },
    categories: {
        default: {appenders: ["loggerConsole"], level: "info"},
        errores: {appenders: ["loggerError"], level: "error"}
    }
})

app.get('/suma', (req,res)=> {
    const consoleLogger = log4js.getLogger('default');
    const errorLogger = log4js.getLogger('errores');
    const {num1, num2} = req.query
    if (isNaN(num1) || isNaN(num2)) {
        errorLogger.error("Error en los parámetros")
        res.send("Error")
    } 
    else {
        consoleLogger.info ("Operación exitosa!")
        res.send(`La suma es: ${num1 + num2}`)
    }
})

const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});