'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie_character extends Model {
    static associate(models) {
      // define association here
    }
  };
  movie_character.init({
    movie_id: DataTypes.NUMBER,
    character_id: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'movie_character',
  });
  return movie_character;
};