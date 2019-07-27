module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {q
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
    // We're saying that a Location should belong to an Category
    // A Location can't be created without an Category due to the foreign key constraint
    Location.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Location;
}

