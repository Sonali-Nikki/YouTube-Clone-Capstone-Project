import express from 'express';
import { registerUser, signinUser } from '../controllers/authController.js';


const router = express.Router();


router.post('/register', registerUser);
router.post('/signin', signinUser);

export default router;
