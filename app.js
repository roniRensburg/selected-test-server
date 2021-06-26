const express = require("express");
const cors = require("cors");

const config = require("./config");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/send", (req, res) => {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  try {
    if (!emailRegexp.test(req.body.email)) throw "email";
    const mailOptions = {
      from: req.body.email,
      to: "ronirensburg@gmail.com",
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
        return res.status(500).json({
          success: false,
          message: "Something went wrong. Try again later",
          err: err,
        });
      } else {
        return res.json({
          success: true,
          message: "Thanks for contacting us. we will get back to you shortly",
        });
      }
    });
  } catch (error) {
    if (error == "email") {
      return res.status(400).json({
        success: false,
        message: "Invalid email address. Try again",
        err: error,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Something went wrong. Try again later",
        err: error,
      });
    }
  }
});

var port = process.env.PORT || 1000;

app.listen(port, () => console.log("running"));

module.exports = app;
