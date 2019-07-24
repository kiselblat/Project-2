/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
  // Get all inventory
  app.get("/api/inventory", function(req, res) {
    console.log("DataRetrieving!");
    db.Inventory.findAll({}).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });

  // Create a new inventory
  app.post("/api/inventory", function(req, res) {
    db.Inventory.create(req.body).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });

  // Delete an inventory by id
  app.delete("/api/inventory/:id", function(req, res) {
    db.Inventory.destroy({ where: { id: req.params.id } }).then(function(dbInventory) {
      res.json(dbInventory);
    });
  });
};
