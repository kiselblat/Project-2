// var db = require("../models");
var transporter = require("../config/transporter");
require("dotenv").config();

module.exports = function(app) {

  // Send email via post request
  app.post("/api/send", function(req, res) {
    var mailOptions = req.body;
    mailOptions.from = process.env.GMAIL_USER;
    transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        console.log(err);
      } else {
        console.log(info);
      }
      res.end("Post happened");
    });
  });

};
