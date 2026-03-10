/**
 * Email service placeholder
 * Replace with actual email sending logic (e.g., nodemailer, SendGrid)
 */

const sendWelcome = async (email, firstName) => {
  console.log(`[emailService] Sending welcome email to ${email}`);
  // TODO: implement actual email sending
};

const sendPasswordReset = async (email, resetLink) => {
  console.log(`[emailService] Sending password reset email to ${email} with link: ${resetLink}`);
  // TODO: implement
};

module.exports = {
  sendWelcome,
  sendPasswordReset,
};