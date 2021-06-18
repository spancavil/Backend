import express from "express";
import morgan from "morgan";
import router1 from "./router1";

var __dirname: string; //Por algun motivo hay que declarar __dirname como string;

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(express.static("/public"));

//Simulacion get sencillo
app.get('/', (req:any,res:any)=>{
    res.sendFile('index.html', {root: `${__dirname}/../public`});
})

//Simulación post sencillo utilizando un router
app.use('/api', router1);

app.listen(PORT, () => {
    console.log('Servidor escuchando en http://localhost:8080');
});