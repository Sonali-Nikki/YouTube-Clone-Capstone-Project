import express from "express";
import {
  uploadVideo,
  editVideo,
  deleteVideo,
  getVideoById,
  getAllVideos,
} from "../controllers/videoController.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post('/', protect, uploadVideo);
router.put('/:videoId', protect, editVideo);
router.delete('/:videoId', protect, deleteVideo);
router.get('/:videoId', getVideoById);
router.get('/', getAllVideos);



export default router;