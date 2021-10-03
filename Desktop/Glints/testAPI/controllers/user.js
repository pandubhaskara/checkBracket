const { User } = require("../models");
const { checkPw } = require("../helpers/bcrypt");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/jwt");
const { getUserData } = require("../helpers/jwt");
const Joi = require("joi");

class userController {
  static async createUser(req, res) {
    const body = req.body;
    try {
      const schema = Joi.object({
        fullName: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      const check = schema.validate(
        { ...body }, 
        { abortEarly: false }
      );
      if (check.error) {
        return res.status(400).json({
          status: "failed",
          message: "Bad Request",
          errors: check.error["details"][0]["message"],
        });
      }
      const checkEmail = await User.findOne({
        where: {
          email: body.email,
        },
      });
      if (checkEmail) {
        return res.status(400).json({
          status: "failed",
          message: "Email already used, please use another email",
        });
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      if (req.file && req.file.path) {
        users.profilePicture = req.file.path;
      }
      const user = await User.create({
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword
      });
      if (user) {
        let dataUser = user.dataValues;
        let token = generateToken(dataUser);
        return res.status(200).json({
          success: true,
          message: "Successfully created user account",
          token: token,
        });
      } else {
        return res.status(401).json({ 
          message: "Failed to create user account" 
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async Login(req, res) {
    const body = req.body;
    try {
      const email = body.email;
      const password = body.password;
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      });
      const { error } = schema.validate({ ...body });
      if (error) {
        return res.status(400).json({
          status: "Failed",
          message: error.message,
        });
      }
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "Incorrect email or passsword",
        });
      }
      const hashedPW = user.dataValues.password;
      if (checkPw(password, hashedPW)) {
        let dataUser = user.dataValues;
        delete dataUser.password;
        let token = generateToken(dataUser);
        return res.status(200).json({ 
          success: true, 
          message: "Login success", 
          token: token 
        });
      } else {
        return res.status(401).json({
          status: "Failed", 
          message: "Incorrect email or password" 
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async getAllUser(req, res) {
    try {
      const users = await User.findAll();
      if (!users.length) {
        return res.status(400).json({
          status: "failed",
          message: "There's no user in database!",
        });
      } else {
        return res.status(200).json({
          success: { message: "This is the list of users" },
          data: users,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async viewUserById(req, res) {
    try {
      const userData = getUserData(req.headers.token);
      const userId = userData.id;
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ['password', 'role'] }
      });
      if (!user) {
        return res.status(400).json({
          status: "failed",
          message: "User not found!",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Successfully retrieved user!",
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async updateUser(req, res) {
    const body = req.body;
    const id = req.params.id;
    try {
      const schema = Joi.object({
        fullName: Joi.string().min(4),
        email: Joi.string().email(),
        password: Joi.string().min(6),
        profilePicture: Joi.string(),
      });

      const { error } = schema.validate(
        {
          fullName: body.fullName,
          email: body.email,
          password: body.Password,
          profilePicture: req.file ? req.file.path : "profilePicture",
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
      if (body.password) {
        const checkId = await User.findOne({
          where: { id: id },
        });
        const checkPassword = await bcrypt.compare(
          body.password,
          checkId.password
        );
        if (checkPassword) {
          return res.status(400).json({
            status: "Failed",
            message: "New password has already used before, try another password"
          });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await User.update(
          { password: hashedPassword },
          { where: { id: req.params.id } }
        );
        return res.status(200).json({
          status: "Success",
          message: "Successfully update password",
        });
      }

      const [updatedUser] = await User.update(
        {
          ...req.body,
          fullName: body.fullName,
          email: body.email,
          [req.file ? "profilePicture" : null]: req.file ? req.file.path : null,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updatedUser) {
        return res.status(400).json({
          status: "Failed",
          message: "Failed to update!"
        });
      }
      const updateUser = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({ 
        status: "Success", 
        message: "Successfully update user data", 
        data: updateUser 
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async deleteUser(req, res) {
    try {
      const deletedUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!deletedUser) {
        return res.status(400).json({
          status: "failed",
          message: "Failed to delete!",
        });
      } else {
        return res.status(200).json({
          status: "success",
          message: "Successfully delete user!",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = userController;
