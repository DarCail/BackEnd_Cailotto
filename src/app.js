//importamos express

import express from 'express';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js'

// const productsRouter = require("./routers/products.router")
// const cartsRouter = require("./routers/carts.router")

// instancia de express

const app = express();

//configurar puerto

const PORT = 8080

//Midleware para que express lea los json de los request

app.use(express.json())

//definan las rutas de los productos

 app.use('/api/products', productsRouter);
 app.use('api/carts', cartsRouter);

app.listen(PORT =>{
    console.log(`servidor en el puerto ${8080}`)
})