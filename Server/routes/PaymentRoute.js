import express from 'express';
import { isVerified } from '../middleware/tokenVerify.js';
import { createOrder, verifyPaymentRazorpay, webHookVerification } from '../controllers/PaymentController.js';
const Router = express.Router();

Router.post('/create-order',isVerified,createOrder);
Router.post('/verify-payment',isVerified,verifyPaymentRazorpay);
Router.post('/webHookVerify',webHookVerification);

export default Router;