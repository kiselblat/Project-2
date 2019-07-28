var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Inventory.findAll({}).then(function(dbInventory) {
      console.log("Databack!");
      // console.log(dbInventory);
      res.render("index", {
        msg: "Welcome!",
        items: dbInventory
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};