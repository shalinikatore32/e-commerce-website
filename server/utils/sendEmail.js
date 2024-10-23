const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/user-model');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USERNAME,
  to: 'shalinikatore32@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending test email:', error);
  } else {
    console.log('Test email sent:', info.response);
  }
});

module.exports=transporter;
