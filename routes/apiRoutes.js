/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function (app) {

  // Get all inventory
  app.get("/api/inventory", function (req, res) {
    console.log("DataRetrieving!");
    db.Inventory.findAll({}).then(function (dbInventory) {
      res.json(dbInventory);
    });
  });

  // Get an existing item
  app.get("/api/inventory/:id", function (req, res) {
    console.log("DataRetrieving... only one!");
    db.Inventory.findOne({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });

  // Create a new item
  app.post("/api/inventory", function (req, res) {
    db.Inventory.create(req.body).then(function (dbInventory) {
      console.log(dbInventory);
      res.json(dbInventory);
    });
  });

  // Update an item
  app.put("/api/update/", function (req, res) {
    db.Inventory.update(
      req.body,
      {where: {id: req.body.id}}).then(function (result) {
      console.log(result);
      res.json(result);
    });
  });

  // Delete an item by id
  app.delete("/api/delete/:id", function (req, res) {
    db.Inventory.destroy({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });



  // // Delete an inventory by id
  // app.delete("/api/inventory/:id", function (req, res) {
  //   db.Inventory.destroy({ where: { id: req.params.id } }).then(function (dbInventory) {
  //     res.json(dbInventory);
  //   });
  // });

  //  Get all items
  //  app.get("/api/all", function(req, res) {
  //   db.Inventory.findAll({}).then(function(result) {
  //     res.json(result);
  //   });
  //  });

  // Create a new item
  // app.post("/api/create", function(req, res) {
  //  db.Inventory.create(req.body).then(function(result) {
  //    res.json(result);
  //  });
  // });


};
