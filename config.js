const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ronirensburg@gmail.com",
    pass: "Azsxsza321",
  },
});

module.exports = transporter;
