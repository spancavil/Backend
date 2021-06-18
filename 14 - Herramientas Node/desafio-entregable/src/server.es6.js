import express from 'express';
const app = express();
import morgan from 'morgan';
import router1 from '../routes/router1';

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

//Simulacion get sencillo
app.get('/', (req,res)=>{
    res.sendFile('index.html', {root: `${__dirname}/../public`}); //TUVE QUE AGREGAR EL ROOT SINO NO ME LO TOMABA
})

//Simulación post sencillo utilizando un router
app.use('/api', router1);

app.listen(8080, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});