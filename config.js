const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

module.exports = transporter;
