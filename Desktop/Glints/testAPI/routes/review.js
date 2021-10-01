const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/review");

router.get("/", ReviewController.getAllReview);
router.get("/page", ReviewController.getReviewByPage);
router.get("/:id", ReviewController.getReviewById);
router.get("/user/:userId", ReviewController.getReviewByUserId);
router.post("/", ReviewController.createReview);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

module.exports = router;
