// importing necessary library and controllers
import express from 'express';
import { registerUser, signinUser } from '../controllers/authController.js';

// initializing a router instance
const router = express.Router();

// api for POST /api/register
router.post('/register', registerUser);

// api for POST /api/signin
router.post('/signin', signinUser);

export default router;
