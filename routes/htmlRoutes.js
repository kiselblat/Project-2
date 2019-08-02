var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
  
    db.Category.findAll({}).then(function(dbCategories) {

      db.Location.findAll({}).then(function(dbLocations) {

        db.Inventory.findAll({}).then(function(dbInventory) {
          console.log("Databack!");
          // console.log(dbInventory);
          res.render("index", {
            msg: "Welcome To Nesterly",
            items: dbInventory,
            categories: dbCategories,
            locations: dbLocations
          });
        });

      });

    });
  });

  // Load inventory page and pass in an inventory by id
  app.get("/inventory/:id", function(req, res) {
    db.Inventory.findOne({ where: { id: req.params.id } }).then(function(dbInventory) {
      res.render("inventory", {
        Inventory: dbInventory
      });
    });
  });

  // Load category page
  app.get("/categories", function(req, res) {
    db.Category.findAll({}).then(function(dbCategories) {
      res.render("categories", {
        categories: dbCategories
      });
    });
  });

  // Load location page
  app.get("/locations", function(req, res) {
    db.Location.findAll({}).then(function(dbLocations) {
      res.render("locations", {
        locations: dbLocations
      });
    });
  });

  app.get("/mailer", function (req, res) {
    db.Inventory.findAll({}).then(function (dbItems) {
      res.render("mailer", {
        items: dbItems,
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};