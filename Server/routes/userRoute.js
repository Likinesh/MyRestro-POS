import express from 'express';
import { getUserData, login, logout, register } from '../controllers/userController.js';
import { isVerified } from '../middleware/tokenVerify.js';
const router = express.Router();

router.post("/register",register)
router.post("/login",login);
router.get('/',isVerified,getUserData);
router.post('/logout',isVerified,logout)

export default router; 