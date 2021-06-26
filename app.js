const express = require("express");
const cors = require("cors");

const config = require("./config");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/send", (req, res) => {
  try {
    console.log(req.body);
    const mailOptions = {
      from: req.body.email,
      to: process.env.emailRecipient,
      subject: req.body.subject,
      html: `
         <p>You have a new contact request.</p>
         <h3>contact Details</h3>
         <ul>
           <li>Name:${req.body.name}</li>
           <li>Email:${req.body.email}</li>
           <li>Subject:${req.body.subject}</li>
           <li>Message:${req.body.message}</li>
         </ul>
         `,
    };

    config.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          success: false,
          message: "Something went wrong. Try again later",
        });
      } else {
        return res.send({
          success: true,
          message: "Thanks for contacting us. we will get back to you shortly",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong. Try again later",
    });
  }
});

app.listen(1000, () => console.log("running"));

module.exports = app;
