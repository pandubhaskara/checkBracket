const Joi= require('joi')
const {moviedb} = require("../models");

module.exports = {
  postMovie: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({
        title: Joi.string().required(),
        synopsis: Joi.text().required(),
        trailer: Joi.string().required(),
        poster: Joi.string().required(),
        rating: Joi.number().required(),
        releaseDate: body.releaseDate,
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
    try {
      const data = await moviedb.findAll();
      if (!data) {
        return res.status(404).json({
          status: "failed",
          message: "Data not found",
          data: [],
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
};
