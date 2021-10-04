const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review");
const {authentication} = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/isAdmin');

router.get("/", ReviewController.getAllReview);
router.get("/", ReviewController.getReviewByPage);
router.get("/:id", ReviewController.getReviewById);
router.get("/user/:userId", ReviewController.getReviewByUserId);
router.post("/", authentication, ReviewController.createReview);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

module.exports = router;
