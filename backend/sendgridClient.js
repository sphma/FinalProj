require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = async (to, products, total) => {
  const productList = products.map(
    item => `<li>${item.quantity} × ${item.name} ($${item.price})</li>`
  ).join('');
  const msg = {
    to,
    from: process.env.EMAIL, // Your verified sender
    subject: 'Thank you for your purchase from Opashi Studios!',
    text: `Thank you for your purchase!\n\nProducts:\n${products.map(item => `${item.quantity} × ${item.name} ($${item.price})`).join('\n')}\n\nTotal: $${total}`,
    html: `<strong>Thank you for your purchase!</strong><br/><ul>${productList}</ul><br/><strong>Total: $${total}</strong>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendEmail };