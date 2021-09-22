const dotenv = require('dotenv');
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendSMSTwilio(data){
    client.messages
    .create({
        body: `Author: ${data.author}. Mensaje: ${data.text}`,
        from: process.env.FROMSMS,
        to: process.env.DESTINATARIOSMS
    })
    .then(message => console.log(message.sid));
}

module.exports = sendSMSTwilio