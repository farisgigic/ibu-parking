const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendEmail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,   
    to: email,                      
    subject,
    text: `Hi ${name},\n\n${message}\n\nBest regards,\nStudent Parking Team`,
  };

  await transporter.sendMail(mailOptions);
};
