const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    // secure: true, // use SSL
    auth: {
        user: '',
        pass: ''
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
    'Vitaliy <> ', // from
    '', // to
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

