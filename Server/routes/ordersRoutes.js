import express from 'express'
import { isVerified } from '../middleware/tokenVerify.js';
import { add_order, get_order, get_orders, update_order } from '../controllers/orderController.js';

const Router = express.Router();

Router.post('/',isVerified,add_order);
Router.get('/',isVerified,get_orders)
Router.get("/:id",isVerified,get_order)
Router.put('/:id',isVerified,update_order)

export default Router;