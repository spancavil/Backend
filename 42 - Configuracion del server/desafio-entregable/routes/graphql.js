const express = require('express');
const {graphqlHTTP} = require ('express-graphql');
const {buildSchema} = require('graphql');

const Factory = require('../persistence/persistFactory');
const productodao = new Factory("producto").getPersist();

const { loggerError } = require('../loggers/winston');
const routerGraph = express.Router();

const schema = buildSchema(` 
    type Query{
        productById(id: Int!): Producto,
        products: [Producto],
        greetings: String
    },
    type Mutation {
        postProduct(title: String!, price: String!, thumbnail: String!): Producto
    },
    type Producto{
        id: Int,
        title: String,
        price: String,
        thumbnail: String
    }
`)

const getProductById = async function ({id}){
    try {
        const producto = await productosdao.listarId(id);
        return producto
    } catch (e) {
        loggerError('error', "Error al obtener producto por id en graphql:", e)
    }
}

const getProducts = async function(){
    try {
        const productos = await productosdao.listar();
        return productos;
    } catch (e) {
        loggerError('error', "Error al obtener productos en graphql: ", e)        
    }
}

const postProduct = async function ({title, price, thumbnail}){
    try {
        let producto = {
            title,
            price,
            thumbnail
        }
        console.log(producto);
        const response = await productosdao.agregar(producto)
        console.log(response)
        return
    } catch (e) {
        loggerError('error', "Error al guardar un producto en graphql: ", e);
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

routerGraph.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = routerGraph;