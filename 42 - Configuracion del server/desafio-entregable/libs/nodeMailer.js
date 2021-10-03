const nodemailer = require('nodemailer');

function sendMailEthereal(mailOptions) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'laverna.schmitt@ethereal.email',
            pass: 'ZEBUcQbHm9cK5Et47g'
        }
    });

    console.log(mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    });
}

function sendMailGmail(mailOptions) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERGMAIL,
            pass: process.env.PASSGMAIL
        }
    });

    console.log(mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    });
}

module.exports = { sendMailEthereal, sendMailGmail };
