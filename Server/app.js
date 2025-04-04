import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import UserRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import orderRouter from './routes/ordersRoutes.js';
import tableRouter from './routes/tableRoute.js';
import cors from 'cors';
import paymentRouter from './routes/PaymentRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000

app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}));
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use('/api/user',UserRouter);
app.use('/api/order',orderRouter);
app.use('/api/tables',tableRouter);
app.use('/api/payment',paymentRouter)

// ERROR HANDLER;
app.use(globalErrorHandler);

app.listen(PORT,()=>{
    console.log(`Server Running at http://localhost:${PORT}`);
})