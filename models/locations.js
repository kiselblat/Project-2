module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
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
