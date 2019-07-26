module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });
  
  Location.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Location.hasMany(models.Location, {
      onDelete: "cascade"
    });
  };
  
  return Location;
};
