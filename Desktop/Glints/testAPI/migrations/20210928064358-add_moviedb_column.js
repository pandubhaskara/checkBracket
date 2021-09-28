"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "moviedbs",
      "movie_genres",
      Sequelize.STRING
    );
  },
  down: async (queryInterface, Sequelize) => {
    //  * Add reverting commands here.
    return queryInterface.removeColumn(
      "moviedbs",
      "movie_genres",
      Sequelize.STRING
    );
  },
};
