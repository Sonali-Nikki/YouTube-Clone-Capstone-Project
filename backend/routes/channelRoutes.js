// importing necessary library, controllers and middleware
import express from "express";
import {
  createChannel,
  editChannel,
  deleteChannel,
  getChannelById,
  getAllChannels,
} from "../controllers/channelController.js";
import protect from '../middlewares/authMiddleware.js';

// initializing a router instance
const router = express.Router();

// api for POST /api/channel
router.post('/', protect, createChannel);

// api for PUT /api/channel/:channelId
router.put('/:channelId', protect, editChannel);

// api for DELETE /api/channel/:channelId
router.delete('/:channelId', protect, deleteChannel);

// api for GET /api/channel/:channelId
router.get('/:channelId', getChannelById);

// api for GET /api/channel
router.get('/', protect, getAllChannels);

export default router;