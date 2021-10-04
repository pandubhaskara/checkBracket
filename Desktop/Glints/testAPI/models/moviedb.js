'use strict';
const {
  Model
} = require('sequelize');
const movie = require('../controllers/movie');
module.exports = (sequelize, DataTypes) => {
  class moviedb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      moviedb.belongsToMany(models.characters,{
        through: "movie_character",
        as: 'characters',
        foreignKey: 'movie_id'
      })
      moviedb.belongsToMany(models.genre,{
        through: "movie_genre",
        as: 'genres',
        foreignKey: 'movie_id'
      })
      moviedb.hasMany(models.Review,{
        foreignKey: "movieId",
        as: "reviews"
      })
    }
  };
  moviedb.init({
    title: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    trailer: DataTypes.STRING,
    poster: DataTypes.STRING,
    star: DataTypes.FLOAT,
    releaseDate: DataTypes.STRING,
    director: DataTypes.STRING,
    featuredSong: DataTypes.STRING,
    budget: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'moviedb',
  });
  return moviedb;
};