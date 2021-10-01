"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.moviedb, {
        foreignKey: "movieId",
        as: "movie",
      });
    }
  };
  Review.init(
    {
      userId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
