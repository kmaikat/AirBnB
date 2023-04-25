'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, {
        targetKey:"id",
        foreignKey: "userId"
      })

      Wishlist.hasMany(models.WishlistItem, {
        foreignKey: "wishlistId"
      })

      Wishlist.belongsToMany()
    }
  }
  Wishlist.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
