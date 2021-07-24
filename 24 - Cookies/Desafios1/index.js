const express = require('express')
const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Servidor express ok!')
})

app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie Set')
})



app.get('/set-Cookie/:nombre/:valor/:tiempo', (req, res) => {
    const {nombre, valor, tiempo} = req.params
    nombre && valor ?
    res.cookie(nombre, valor , tiempo ? { maxAge: (tiempo * 1000) }: null).send({proceso: "ok"})
    :
    res.send({error: "set-cookie falta nombre o valor"})
})

app.get('/get', (req, res) => {
    res.send(req.cookies)
})

app.get('/clr', (req, res) => {
    res.clearCookie('server').send('Cookie Clear')
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`servidor express escuchando en http://localhost:${PORT}`)
})