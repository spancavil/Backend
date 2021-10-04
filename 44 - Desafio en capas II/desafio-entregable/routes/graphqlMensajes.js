const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const Factory = require('../persistence/persistFactory');
const mensajesdao = new Factory("mensajes").getPersist();
const instance = new mensajesdao();

const { loggerError, loggerConsole } = require('../loggers/winston');
const routerGraphMensajes = express.Router();

const schema = buildSchema(`
    type Query{
        getMessages: [Message]
    },
    type Mutation {
        postMessage (author: String!, text: String!, date: String!): Message
    },
    type Message{
        id: String,
        author: String,
        text: String,
        date: String
    }
`)

const getMessages = async () => {
    try {
        const mensajes = await instance.traerMensajes();
        return mensajes;
    } catch (e) {
        loggerConsole('debug', 'Error al obtener mensajes en graphQL: ', e)
        loggerError('error', 'Error al obtener mensajes en graphQL: ', e)
    }
}

const postMessage = async (mensaje) => {
    try {
        const response = await instance.guardar(mensaje);
        return response;
    } catch (e) {
        loggerConsole('debug', 'Error al guardar mensaje en graphQL: ', e)
        loggerError('error', 'Error al guardar mensaje en graphQL: ', e)
    }
}

const root = {
    getMessages: getMessages,
    postMessage: postMessage
}

routerGraphMensajes.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

module.exports = routerGraphMensajes;