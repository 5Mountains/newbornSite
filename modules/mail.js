const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    auth: {

    },
    connectionTimeout: 1*60*1000
})

module.exports = {
    send: (from, to, subject, html)=>{
        console.log('send')
        let mailOptions = {
            from,
            to,
            subject,
            html
        }
    
        transporter.sendMail(mailOptions, (err, res) => {
            if (err) console.log('Error: ', err)
            else console.log('Email Sent: ', res)
        })
    }
};
