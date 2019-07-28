module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
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
