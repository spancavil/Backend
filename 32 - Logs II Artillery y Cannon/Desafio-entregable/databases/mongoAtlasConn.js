const mongoose = require('mongoose');
const {loggerConsole, loggerError} = require('../loggers/winston')

try {
    const connection = mongoose.connect("mongodb+srv://root:root@cluster0.vchky.mongodb.net/myDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('connected', () => {
        loggerConsole.log('debug', '[Mongoose] - connected in: cluster0.vchky.mongodb.net');
    });

    module.exports = connection;

} catch (error) {
    loggerError.log('error', `[Mongoose] - error: ${error}` )
}


