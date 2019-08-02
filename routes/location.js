var db = require("../models");

module.exports = function (app) {
  app.get("/api/locations", function (req, res) {
    db.Location.findAll({}).then(function (dbLocations) {
      res.json(dbLocations);
    });
  });

  app.get("/api/locations/:id", function (req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Location.findOne({
      where: {
        id: req.params.id
      }, include: [db.Category]
    }).then(function (dbLocations) {
      res.json(dbLocations);

    });
  });

  app.post("/api/locations", function (req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Location.create(req.body).then(function (dbLocations) {
      res.json(dbLocations);
    });
  });

  app.delete("/api/locations/:id", function (req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Location.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbLocations) {
      res.json(dbLocations);
    });
  });

};