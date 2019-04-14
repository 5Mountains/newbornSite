const nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    // host: 'smtp.gmail.com',
    port: 2525,
    // port: 465,
    // secure: true, // use SSL
    auth: {
        user: 'vladyslavpiatyhor@gmail.com',
        // pass: 'Veracruz2007'
        pass: 'e2a3ac30-2623-4d8f-a15a-41a95d3d900e'
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

// const nodemailer = require('nodemailer');

// let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'vladyslavpiatyhor@gmail.com',
//             pass: 'VolvoS402008'
//         }
//     })

// var mailOptions = {
//     form: 'vladyslavpiatyhor@gmail.com',
//     to:'v.piatyhor@gmail.com',
//     subject: 'SendingEmail with Node.js',
//     text: `endingEmail with Node.js`
// }

// transporter.sendMail(mailOptions, (error, info) => {
//     if (err) console.log('Error: ', error)
//     else console.log('Email Sent: ', info.response)
// })