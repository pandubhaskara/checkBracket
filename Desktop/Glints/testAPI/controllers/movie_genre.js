const Joi = require("joi");
const { movie_genre } = require("../models");

module.exports = {
  add: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({
        movie_id: Joi.number().required(),
        genre_id: Joi.number().required(),
      });

      const { error } = schema.validate(
        {
          movie_id: body.movie_id,
          genre_id: body.genre_id,
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

      const check = await movie_genre.create({
        movie_id: body.movie_id,
        genre_id: body.genre_id,
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
  get: async (req, res) => {
    try {
      const data = await movie_genre.findAll();
      if (!data) {
        return res.status(404).json({
          status: "failed",
          message: "Data not found",
          data: [],
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully retrieved genres tables",
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
  update: async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const schema = Joi.object({
        movie_id: Joi.number(),
        genre_id: Joi.number(),
      });

      const { error } = schema.validate(
        {
          movie_id: body.name,
          genre_id: body.photo,
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

      const updatedMochar = await movie_genre.update(
        { ...body },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedMochar[0]) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to update database",
        });
      }

      const data = await movie_genre.findOne({
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
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const check = await movie_genre.destroy({
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
