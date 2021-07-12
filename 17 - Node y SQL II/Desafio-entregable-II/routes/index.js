import express from 'express';
import routerProducts from '../routes/productos.js';
const router = express.Router();


router.use('/productos', routerProducts);


export default router;