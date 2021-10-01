const models = require("../models");
const review = require("../models").Review;
const movie = require("../models").moviedb;
const user = require("../models").User;

const getAllReview = async (req, res) => {
  try {
    const movieId = req.body.movieId;
    const Review = await review.findAll({
      include: [
        {
          model: user,
          as: "user",
          attributes: { exclude: ["email", "password"] },
        },
      ],
    });
    if (!Review) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Get Review",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get Review Success",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const getReviewByPage = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const result = {};
    const Review = await models.Review.findAll();
    if (endIndex < Review.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.result = Review.slice(startIndex, endIndex);
    res.json(result);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Get Review By Page",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get Review By Page Success",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const Review = await models.Review.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: user,
          as: "user",
          attributes: { exclude: ["email", "password"] },
        },
      ],
    });

    if (!Review) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Get Review",
        data: Review,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get Review Success",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const getReviewByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const Review = await models.Review.findAll({
      where: {
        userId: userId,
      },
    });
    if (!Review) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Get User Review",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Get User Review Success",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const createReview = async (req, res) => {
  try {
    const { userId, movieId, comment, rating } = req.body;
    const isExist = await models.Review.findOne({
      where: {
        userId: userId,
        movieId: movieId,
      },
    });
    if (isExist) {
      res.status(200).send({
        status: 200,
        message: "Review Already Exist",
      });
    } else {
      const Review = await models.Review.create({
        userId,
        movieId,
        comment,
        rating,
      });
      if (!Review) {
        res.status(400).json({
          status: "failed",
          message: "Cannot Add Review",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Add Review Successfully",
        data: Review,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId, movieId, comment, rating } = req.body;
    const Review = await models.Review.update(
      {
        userId,
        movieId,
        comment,
        rating,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!Review) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Update Review",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Update Review Success",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    const Review = await models.Review.destroy({
      where: {
        id: id,
      },
    });
    if (!Review) {
      res.status(400).json({
        status: "failed",
        message: "Cannot Delete Review",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Delete Review Success",
      data: Review,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getAllReview,
  getReviewByPage,
  getReviewById,
  getReviewByUserId,
  createReview,
  updateReview,
  deleteReview,
};
