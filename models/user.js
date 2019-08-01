var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  var Registry = sequelize.define("Registry", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

//   var User = module.exports = 

  Registry.associate = function (models) {
    // Each inventory item belongs to a category
    Registry.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      }
    });
    // Each inventory item belongs to a location
    Registry.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Registry;
};
