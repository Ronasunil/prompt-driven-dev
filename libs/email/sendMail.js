const nodemailer = require('nodemailer');

// Configure transporter for Brevo (Sendinblue)
const transporter = nodemailer.createTransport({
  service: 'Brevo',
  auth: {
    user: process.env.BREVO_USER, // Set in your environment variables
    pass: process.env.BREVO_PASS  // Set in your environment variables
  }
});

/**
 * Send an email using the provided template
 * @param {string} to - Recipient email address
 * @param {object} template - Object with subject and html properties
 */
async function sendMail(to, template) {
  const mailOptions = {
    from: process.env.BREVO_USER,
    to,
    subject: template.subject,
    html: template.html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
