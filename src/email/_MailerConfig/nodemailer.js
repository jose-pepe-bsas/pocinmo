const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  secure: process.env.SECURE === 'false' ? false : true,
  auth: {
    user: process.env.NAME_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});

module.exports = {transporter};
