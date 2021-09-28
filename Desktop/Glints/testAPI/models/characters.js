'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      characters.belongsToMany(models.moviedb, {
        through:'movie_character',
        as: 'movies',
        foreignKey:'character_id'
      })
    }
  };
  characters.init({
    name: DataTypes.STRING,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'characters',
  });
  return characters;
};