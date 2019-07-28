module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });

  Category.associate = function(models) {
    // A catagory has many different items in it
    Category.hasMany(models.Inventory, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Category;
};
