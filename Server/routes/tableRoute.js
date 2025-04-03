import express from 'express'
import { isVerified } from '../middleware/tokenVerify.js';
import { addTable, getTable, updateTable } from '../controllers/tableController.js';
const Router = express.Router();

Router.post('/',isVerified,addTable);
Router.get('/',isVerified,getTable)
Router.put('/:id',isVerified,updateTable)

export default Router