'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class moviedb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  moviedb.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    trailer: DataTypes.STRING,
    poster: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    releaseDate: DataTypes.DATE,
    director: DataTypes.STRING,
    featuredSong: DataTypes.STRING,
    budget: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'moviedb',
  });
  return moviedb;
};