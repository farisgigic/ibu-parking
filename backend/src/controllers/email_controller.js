const emailService = require('../services/email_service.js');

exports.sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await emailService.sendEmail({ name, email, subject, message });
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error.message, error.response || '');
    res.status(500).json({ error: 'Failed to send email.' });
  }
};
