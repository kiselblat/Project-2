module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });
  
  Location.associate = function(models) {
    // We're saying that a Location should belong to an Author
    // A Location can't be created without an Author due to the foreign key constraint
    Location.belongsTo(models.Inventory, {
      foreignKey: {
        allowNull: false
      }
    });
    // Location.hasMany(models.Inventory, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Location;
};
