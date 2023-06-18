const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const isValidWorkEmail = async (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return pattern.test(email);
};

const generateRandomPassword = async () => {
  return Math.random().toString(36).slice(-8);
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// compare password by taking entered password, and original password
const comparePassword = async (password, userPassword) => {
  const match = await bcrypt.compare(password, userPassword);

  if (match) return true;
  else return false;
};

const sendPasswordOnEmail = async (toEmail, toText) => {
  // Configure Nodemailer to use Mailtrap SMTP
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: toEmail,
    subject: "Welcome to Go Clip",
    text: toText,
  };

  await transport.sendMail(mailOptions);
};

module.exports = {
  isValidWorkEmail,
  generateRandomPassword,
  hashPassword,
  comparePassword,
  sendPasswordOnEmail,
};
