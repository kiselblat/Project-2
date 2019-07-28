module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Location.associate = function(models) {
    // Each location contains many items
    Location.hasMany(models.Inventory, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Location;
};
