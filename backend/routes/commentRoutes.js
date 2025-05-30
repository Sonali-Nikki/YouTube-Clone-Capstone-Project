import express from "express";
import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import protect from "../middlewares/authMiddleware.js";



const router = express.Router();
router.post('/', protect, addComment);
router.put('/:commentId', protect, editComment);
router.delete('/:commentId', protect, deleteComment);

export default router;