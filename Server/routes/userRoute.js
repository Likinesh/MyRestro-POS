import express from 'express';
import { getUserData, login, register } from '../controllers/userController';
import { isVerified } from '../middleware/tokenVerify';
const router = express.Router();

router.post("/register",register)
router.post("/login",login);
router.get('/',isVerified,getUserData)

export default router; 