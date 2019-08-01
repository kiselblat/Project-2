var transporter = require("../config/transporter");
var JSONtoCSV = require("json2csv").parse;
require("dotenv").config();

module.exports = function(app) {

  // Send email via post request
  app.post("/api/send", function(req, res) {
    
    var destinationAddress = req.body.to;
    var messageBody = req.body.html;
    var csvContent = JSONtoCSV(req.body.attachment, {
      fields: [
        "id",
        "item",
        "description",
        "cost",
        "serialNum",
        "warrantyExp",
        "createdAt",
        "updatedAt",
        "CategoryId",
        "LocationId",
      ]
    });

    var newMail = {
      to: destinationAddress,
      subject: "Nesterly Item Report Email",
      from: process.env.GMAIL_USER,
      html: messageBody,
      attachments: [
        {
          filename: "item-report.csv",
          content: csvContent
        }
      ]
    };

    transporter.sendMail(newMail, function (err, info) {
      if(err) {
        console.log(err);
      } else {
        console.log(info);
      }
      res.end("Post happened");
    });
  });

};
