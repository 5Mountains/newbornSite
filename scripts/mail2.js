var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fivemountains.dev@gmail.com',
        pass: 'Veracruz2007'
    }
});

console.log('created');
transporter.sendMail({
from: 'fivemountains.dev@gmail.com',
  to: 'pyatygorr@gmail.com',
  subject: 'hello world!',
  text: 'hello world!'
});