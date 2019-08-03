/* eslint-disable prettier/prettier */
var db = require("../models");
var Fuse = require("fuse.js");

module.exports = function (app) {

  // Get all inventory
  app.get("/api/inventory", function (req, res) {
    // console.log("DataRetrieving!");
    db.Inventory.findAll({}).then(function (dbInventory) {
      res.json(dbInventory);
    });
  });

  // Get an existing item
  app.get("/api/inventory/:id", function (req, res) {
    // console.log("DataRetrieving... only one!");
    db.Inventory.findOne({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });

  // Create a new item
  app.post("/api/inventory", function (req, res) {
    db.Inventory.create(req.body).then(function (dbInventory) {
      // console.log(dbInventory);
      res.json(dbInventory);
    });
  });

  // Update an item
  app.put("/api/update/", function (req, res) {
    db.Inventory.update(
      req.body,
      { where: { id: req.body.id } }).then(function (result) {
      res.json(result);
    });
  });

  // Delete an item by id
  app.delete("/api/delete/:id", function (req, res) {
    db.Inventory.destroy({ where: { id: req.params.id } }).then(function (result) {
      res.json(result);
    });
  });

  // Get all inventory
  app.get("/api/searchinventory/:srch", function (req, res) {
    var glbsrch = req.params.srch;
    db.Inventory.findAll({}).then(function (dbInventory) {
      // var options = {
      //   keys: ["item", "description"]
      // };
      var options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "item",
          "description"
        ]
      };
      var fuse = new Fuse(dbInventory, options);
      console.log(glbsrch);
      var show = fuse.search(glbsrch);
      // console.log(show);
      res.json(show);
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
