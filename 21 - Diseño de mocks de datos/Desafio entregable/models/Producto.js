const faker = require ('faker');

class ModeloProducto {
    constructor(){
    }

    generarProducto(){
        return {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.fashion()
        }
    }
}

module.exports = new ModeloProducto();