const nodemailer = require('nodemailer');
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    // secure: true, // use SSL
    auth: {
        user: 'fivemountains.dev@gmail.com',
        pass: 'a1ae0748-fbd1-4e08-a1a4-b0c53863b70c'
    },
    connectionTimeout: 1*60*1000
})

function send(from, to, subject, html) {


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

send(
    'Vitaliy <fivemountains.dev@gmail.com> ', // from
    'pyatygorr@gmail.com', // to
    'Підтвердження пошти | Mail Confirmation', // subject
    // html
    `<p>
            Для підтвердження пошти перейдіть за цим посиланням 
            | To verify your mail, go to this link. 
            <a href="${'process.env.HOST'}/pages/auth/mail-verify?token=${'email_token'}" target="_blank">link</a>
        </p>` +
    new Date(),
)

const m = {};
m.send = (from, to, subject, html) => send(from, to, subject, html)  
module.exports = m;

module.exports = {
    send: ()=>{

    }
};

