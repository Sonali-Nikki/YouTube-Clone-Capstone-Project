import express from "express";
import {
  createChannel,
  editChannel,
  deleteChannel,
  getChannelById,
  getAllChannels,
} from "../controllers/channelController.js";
import protect from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/', protect, createChannel);
router.put('/:channelId', protect, editChannel);
router.delete('/:channelId', protect, deleteChannel);
router.get('/:channelId', getChannelById);
router.get('/', protect, getAllChannels);



export default router;