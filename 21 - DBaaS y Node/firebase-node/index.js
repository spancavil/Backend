const admin = require('firebase-admin');

const account = require('./firebase-clave.json');

admin.initializeApp({
    credential: admin.credential.cert(account),
    database: "Backend-db.firebaseio.com"
});

console.log('Conexion a la base de datos realizada!');