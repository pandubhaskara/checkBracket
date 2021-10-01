'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Review,{
        foreignKey: "userId",
        as:"user"
      })
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    profilePicture: {
      type: DataTypes.STRING,
      defaultValue: "https://res.cloudinary.com/dshzlncww/image/upload/v1632726180/MiniProject/IMG_6548_i1p48d.png"
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};