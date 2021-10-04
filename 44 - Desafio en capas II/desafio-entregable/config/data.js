const dotenv = require('dotenv')
dotenv.config();

module.exports = config = {
    PORT: process.env.PORT,
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    MONGO_CONNECTION: process.env. MONGO_CONNECTION,
    DESTINATARIO: process.env.DESTINATARIO,
    USERGMAIL: process.env.USERGMAIL,
    PASSGMAIL: process.env.PASSGMAIL,
}