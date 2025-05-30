// importing necessary library, controllers and middleware
import express from "express";
import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import protect from "../middlewares/authMiddleware.js";

// initializing a router instance
const router = express.Router();

// api for POST /api/comment
router.post('/', protect, addComment);

// api for PUT /api/comment/:commentId
router.put('/:commentId', protect, editComment);

// api for DELETE /api/comment/commentId
router.delete('/:commentId', protect, deleteComment);

export default router;