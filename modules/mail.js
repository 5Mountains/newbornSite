require('dotenv').config();

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: `${process.env.HOST}`,
    port: 2525,
    auth: {
        user: `${process.env.USER}`,
        pass: `${process.env.PASS}`
    },
    connectionTimeout: 1*60*1000
});
    
module.exports = {
    send: (from, to, subject, html)=>{
        console.log('send')
        let mailOptions = {
            from,
            to,
            subject,
            html
        };
    
        transporter.sendMail(mailOptions, (err, res) => {
            if (err) console.log('Error: ', err);
            else console.log('Email Sent: ', res);
        });
    }
};