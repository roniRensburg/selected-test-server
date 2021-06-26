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
    user: "ronirensburg@gmail.com",
    pass: "Azsxsza321",
  },
});

module.exports = transporter;
