const express = require('express');
const {graphqlHTTP} = require ('express-graphql');
const {buildSchema} = require('graphql');

const Factory = require('../persistence/persistFactory');
const productoDAO = new Factory("producto").getPersist();
const instance = new productoDAO()

const { loggerError } = require('../loggers/winston');
const routerGraphProductos = express.Router();

const schema = buildSchema(` 
    type Query{
        productById(id: String!): Producto,
        products: [Producto],
        greetings: String
    },
    type Mutation {
        postProduct(title: String!, price: Int!, thumbnail: String!): Producto
    },
    type Producto{
        id: String,
        title: String,
        price: Int,
        thumbnail: String
    }
`)

const getProductById = async function ({id}){
    try {
        const producto = await instance.listarId(id);
        return producto
    } catch (e) {
        loggerError.log('error', "Error al obtener producto por id en graphql:", e)
    }
}

const getProducts = async function(){
    try {
        const productos = await instance.listar();
        return productos;
    } catch (e) {
        loggerError.log('error', "Error al obtener productos en graphql: ", e)        
    }
}

const postProduct = async function ({title, price, thumbnail}){
    try {
        let producto = {
            title,
            price,
            thumbnail
        }
        const response = await instance.agregar(producto)
        console.log(response)
        return response;
    } catch (e) {
        loggerError.log('error', "Error al guardar un producto en graphql: ", e);
    }
}

const saludosDesdeGraphql = function (){
    return ("Greetings from graphql");
}

const root = {
    productById: getProductById,
    products: getProducts,
    postProduct: postProduct,
    greetings: saludosDesdeGraphql
}

routerGraphProductos.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = routerGraphProductos;