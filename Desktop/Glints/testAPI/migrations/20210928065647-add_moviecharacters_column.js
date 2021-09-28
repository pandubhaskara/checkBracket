'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "moviedbs",
      "movie_characters",
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "moviedbs",
      "movie_characters",
      Sequelize.STRING
    );
  }
};
