const Joi = require("joi");
const genre = require("../models").genre;
const moviedb = require("../models").moviedb;

module.exports = {
  postGenre: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({
        genrename: Joi.string().required()
      });

      const { error } = schema.validate(
        {
          genrename: body.genrename
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

      const check = await genre.create({
        name: body.name,
        photo: body.photo,
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
  getGenre: async (req, res) => {
    try {
      const data = await genre.findAll();
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
  updategGenre: async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const schema = Joi.object({
        genrename: Joi.string()
      });

      const { error } = schema.validate(
        {
          genrename: body.genrename
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

      const updatedgenre = await genres.update(
        { ...body },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedgenre[0]) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to update database",
        });
      }

      const data = await genres.findOne({
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
  deletegenre: async (req, res) => {
    const id = req.params.id;
    try {
      const check = await genres.destroy({
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
