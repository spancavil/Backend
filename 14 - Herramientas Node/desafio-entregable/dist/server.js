"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var router1_1 = __importDefault(require("./router1"));
var __dirname; //Por algun motivo hay que declarar __dirname como string;
var app = express_1.default();
var PORT = 8080;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(morgan_1.default('dev'));
app.use(express_1.default.static("/public"));
//Simulacion get sencillo
app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/../public" });
});
//Simulación post sencillo utilizando un router
app.use('/api', router1_1.default);
app.listen(PORT, function () {
    console.log('Servidor escuchando en http://localhost:8080');
});
