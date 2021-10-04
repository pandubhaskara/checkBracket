'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      genre.belongsToMany(models.moviedb, {
        through:'movie_genre',
        as: 'movies',
        foreignKey:'genre_id'
      })
    }
  };
  genre.init({
    genrename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'genre',
  });
  return genre;
};