// importing necessary library, controllers and middleware
import express from "express";
import {
  uploadVideo,
  editVideo,
  deleteVideo,
  getVideoById,
  getAllVideos,
} from "../controllers/videoController.js";
import protect from "../middlewares/authMiddleware.js";

// initializing a router instance
const router = express.Router();

// api for POST /api/video
router.post('/', protect, uploadVideo);

// api for PUT /api/video/:videoId
router.put('/:videoId', protect, editVideo);

// api for DELETE /api/video/:videoId
router.delete('/:videoId', protect, deleteVideo);

// api for GET /api/video/videoId
router.get('/:videoId', getVideoById);

// api for GET /api/video
router.get('/', getAllVideos);

export default router;