module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    // Giving the Category model a name of type STRING
    name: DataTypes.STRING
  });

  Category.associate = function(models) {
    // We're saying that a Category should belong to an Author
    // A Category can't be created without an Author due to the foreign key constraint
  
    Category.belongsTo(models.Inventory, {
      foreignKey: {
        allowNull: false
      }
    });
    // Category.hasMany(models.Inventory, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };

  return Category;
};
