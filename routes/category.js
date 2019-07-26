var db = require("../models");

module.exports = function(app) {
  app.get("/api/categories", function(req, res) {
    db.Category.findAll({
      include: [db.Location]
    }).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

  app.get("api/categories/:id", function(req, res) {
    db.Category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Location]
    }).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

  app.post("/api/categories", function(req, res) {
    db.Category.create(req.body).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });

  app.delete("/api/categories/:id", function(req, res) {
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCategories) {
      res.json(dbCategories);
    });
  });
};
