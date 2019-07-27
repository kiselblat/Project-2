module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
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
    Inventory.hasOne(models.Category, {
      onDelete: "cascade"
    });
    Inventory.hasOne(models.Location, {
      onDelete: "cascade"
    });
  };

  return Inventory;
};
