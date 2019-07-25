var db = require("../models");

module.exports = function(app) {
  // Get all items
  app.get("/api/all", function(req, res) {
    db.Inventory.findAll({}).then(function(result) {
      res.json(result);
    });
  });

  // Create a new item
  app.post("/api/create", function(req, res) {
    db.Inventory.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  // Update an item
  app.put("/api/update", function(req, res) {
    db.Inventory.update(req.body).then(function(result) {
      res.json(result);
    });
  });

  // Delete an item by id
  app.delete("/api/delete/:id", function(req, res) {
    db.Inventory.destroy({ where: { id: req.params.id } }).then(function(result) {
      res.json(result);
    });
  });
};
