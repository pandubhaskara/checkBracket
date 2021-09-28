const Joi = require("joi");
const { characters } = require("../models");
const moviedb = require("../models").moviedb;

module.exports = {
  postCharacter: async (req, res) => {
    const body = req.body;
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        photo: Joi.string().required(),
      });

      const { error } = schema.validate(
        {
          name: body.name,
          photo: body.photo,
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

      const check = await characters.create({
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
  getCharacter: async (req, res) => {
    try {
      const data = await characters.findAll({
        include: [
          {
            model: moviedb,
            as: "movies",
          },
        ],
        order: [
          ["createdAt", "ASC"],
          [{ model: moviedb, as: "movies" }, "title", "ASC"],
        ],
      });
      if (!data) {
        return res.status(404).json({
          status: "failed",
          message: "Data not found",
          data: [],
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Successfully retrieved characters tables",
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
  updateCharacter: async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const schema = Joi.object({
        name: Joi.string(),
        photo: Joi.string(),
      });

      const { error } = schema.validate(
        {
          name: body.name,
          photo: body.photo,
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

      const updatedCharacter = await characters.update(
        { ...body },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedCharacter[0]) {
        return res.status(400).json({
          status: "failed",
          message: "Unable to update database",
        });
      }

      const data = await characters.findOne({
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
  deleteCharacter: async (req, res) => {
    const id = req.params.id;
    try {
      const check = await characters.destroy({
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
