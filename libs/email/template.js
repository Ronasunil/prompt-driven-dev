// Email template function
function generateEmailTemplate(name, email) {
  return {
    subject: `Welcome, ${name}!`,
    html: `<p>Hello ${name},</p><p>Thank you for registering with the email: ${email}.</p>`
  };
}

module.exports = { generateEmailTemplate };
