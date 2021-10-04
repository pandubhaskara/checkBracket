const Joi = require("joi");
const models = require("../models");
const moviedb = require("../models").moviedb;
const characters = require("../models").characters;
const genre = require("../models").genre;
const review = require("../models").Review;
const user = require("../models").User;
const sequelize = require('sequelize')
const Op = sequelize.Op;

module.exports = {
  postMovie: async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const schema = Joi.object({
        title: Joi.string().required(),
        synopsis: Joi.string().required(),
        trailer: Joi.string().required(),
        poster: Joi.string().required(),
        rating: Joi.number().required(),
        releaseDate: Joi.string().required(),
        director: Joi.string().required(),
        featuredSong: Joi.string().required(),
        budget: Joi.string().required(),
      });

      const { error } = schema.validate(
        {
          title: body.title,
          synopsis: body.synopsis,
          trailer: body.trailer,
          poster: body.poster,
          rating: body.rating,
          releaseDate: body.releaseDate,
          director: body.director,
          featuredSong: body.featuredSong,
          budget: body.budget,
        },
        { abortEarly: false }
      );

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Bad Request",
          errors: error["details"][0]["message"],
        });
      }
      const title = req.query.title
      const dulplicate = await characters.findOne({
        where: {
          title: {
            [Op.iLike]:`%${title}%`
          }
        },
      });
      if (dulplicate) {
        res.status(400).json({
          status: "failed",
          message: "This movie was already exist on database"
        });
      }
      const check = await moviedb.create({
        title: body.title,
        synopsis: body.synopsis,
        trailer: body.trailer,
        poster: body.poster,
        rating: body.rating,
        releaseDate: body.releaseDate,
        director: body.director,
        featuredSong: body.featuredSong,
        budget: body.budget,
      });

      if (!check) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to save the data to database",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully saved to database",
        data: check,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
  getMovie: async (req, res) => {
   const title = req.query.title
    try {
      const data = await moviedb.findAll(
        {
        order: [
          ["star", "DESC"],
        ],
        where:{
          title: {
            [Op.iLike]:`%${title}%`
          }
        }
      }
      )
      if(data.length==0) {
        return res.status(404).json({
          status: "failed",
          message: "Data not found"
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully retrieved movies tables",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
  getByIdMovie: async (req, res) => {
    const body = req.body;
    try {
      const movie = await moviedb.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: characters,
            as: "characters",
            through: {
              attributes: [],
            },
          },
          {
            model: genre,
            as: "genres",
            through: {
              attributes: [],
            },
          },
          {
            model: review,
            as: "reviews",
            attributes: {
              exclude: ["movieId"],
            },
            include: [
              {
                model: user,
                as: "user",
                attributes: {
                  exclude: ["email", "password", "role"],
                },
              },
            ],
          },
        ],
        order: [
          ["createdAt", "ASC"],
          [{ model: characters, as: "characters" }, "createdAt", "ASC"],
        ],
      });
      if (!movie) {
        return res.status(400).json({
          status: "failed",
          message: "Movie not found!",
        });
      }
      const rating = await review.findAll({
        where: {
          movieId: req.params.id,
        },
        attributes: [
          [
            sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('rating')),2),
            "ratings",
          ],
        ],
        raw: true,
      });
      const update = await moviedb.update(
        {
          star: rating[0].ratings,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!rating) {
        return res.status(400).json({
          status: "failed",
          message: "there is no reviews yet",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully retrieved movie!",
        data: movie,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  },
  updateMovie: async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const schema = Joi.object({
        title: Joi.string(),
        synopsis: Joi.string(),
        trailer: Joi.string(),
        poster: Joi.string(),
        rating: Joi.number(),
        releaseDate: Joi.string(),
        director: Joi.string(),
        featuredSong: Joi.string(),
        budget: Joi.string(),
      });

      const { error } = schema.validate(
        {
          title: body.title,
          synopsis: body.synopsis,
          trailer: body.trailer,
          poster: body.poster,
          rating: body.rating,
          releaseDate: body.releaseDate,
          director: body.director,
          featuredSong: body.featuredSong,
          budget: body.budget,
        },
        { abortEarly: false }
      );

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "Bad Request",
          errors: error["details"][0]["message"],
        });
      }

      const updatedMovie = await moviedb.update(
        { ...body },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedMovie[0]) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to update database",
        });
      }

      const data = await moviedb.findOne({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).json({
        status: "success",
        message: "Data updated successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
  deleteMovie: async (req, res) => {
    const id = req.params.id;
    try {
      const check = await moviedb.destroy({
        where: {
          id, // id : id
        },
      });
      if (!check) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to delete the data",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
};
