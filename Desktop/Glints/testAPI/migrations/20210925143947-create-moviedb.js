"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("moviedbs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      synopsis: {
        type: Sequelize.TEXT,
      },
      trailer: {
        type: Sequelize.STRING,
      },
      poster: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      releaseDate: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
      },
      featuredSong: {
        type: Sequelize.STRING,
      },
      budget: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("moviedbs");
  },
};
