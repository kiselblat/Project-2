module.exports = function (sequelize, DataTypes) {

  var Inventory = sequelize.define("Inventory", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: DataTypes.TEXT,
    cost: DataTypes.FLOAT(6, 2),
    serialNum: DataTypes.STRING,
    warrantyExp: DataTypes.STRING
  });

  Inventory.associate = function(models) {
    // Each inventory item belongs to a category
    Inventory.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      }
    });
    // Each inventory item belongs to a location
    Inventory.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Inventory;
};
