/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {

  //Register
  app.post("/register", function (req, res) {
    // var expressValidator = require("express-validator");
    // app.use(expressValidator);

    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.email;
    var password = req.body.email;
    var password2 = req.body.email;

    // req.checkBody("name", "Name is required").notEmpty();
    // req.checkBody("email", "Email is required").notEmpty();
    // req.checkBody("email", "Email is not valid").isEmail();
    // req.checkBody("username", "Username is required").notEmpty();
    // req.checkBody("password", "Password is required").notEmpty();
    // req.checkBody("password2", "Passwords do not match").equals(req.body.password);

    console.log(name);

    // var errors = req.validationErrors();

    // if (errors) {
    //   res.render("register", {
    //     errors: errors
    //   });
    // } else {
    //   console.log("no errors");
    // }
  });

  // Get all inventory
  app.get("/api/inventory", function (req, res) {
    console.log("DataRetrieving!");
    db.Inventory.findAll({}).then(function (dbInventory) {
      res.json(dbInventory);
    });
  });

  // Create a new inventory
  app.post("/api/inventory", function (req, res) {
    db.Inventory.create(req.body).then(function (dbInventory) {
      console.log(dbInventory);
      res.json(dbInventory);
    });
  });

  // Update an item
  app.put("/api/update", function (req, res) {
    db.Inventory.update(req.body).then(function (result) {
      res.json(result);
    });
  });

  // Delete an item by id
  app.delete("/api/delete/:id", function (req, res) {
    db.Inventory.destroy({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });
};
