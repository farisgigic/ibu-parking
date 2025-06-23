import nodemailer from 'nodemailer';
import config from '../config/config.js';
import logger from './loggerService.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.smtpHost,
  port: config.smtpPort,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass
  }
});

export const sendMail = async (to, subject, html, attachments= []) => {
  const mailOptions = {
    from: '"System Parking" <ibu-parking@gmail.com>',
    to,
    subject,
    html: html,
    attachments: attachments
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to} with subject: ${subject}`);
  } catch (err) {
    logger.error(`Error sending email to ${to}: ${err.message}`);
    logger.info(`SMTP credentials: ${config.smtpUser}, ${config.smtpPass}`);
    throw new Error('Email send failed');
  }
};

