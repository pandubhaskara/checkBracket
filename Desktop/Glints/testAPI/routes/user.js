const express = require('express');
const router = express.Router();
const userController = require("../controllers/user");
const { isLogin } = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');
const { upload } = require("../middlewares/multer");

router.post("/", upload.single("profilePicture"), userController.createUser);
router.post("/login", userController.Login);
router.get("/", userController.getAllUser);
router.get("/:id", userController.viewUserById);
router.put("/:id", upload.single("profilePicture"), userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;