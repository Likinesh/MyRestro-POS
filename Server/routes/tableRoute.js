import express from 'express'
import { isVerified } from '../middleware/tokenVerify';
import { addTable, getTable, updateTable } from '../controllers/tableController';
const Router = express.Router();

Router.post('/',isVerified,addTable);
Router.get('/',isVerified,getTable)
Router.put('/:id',isVerified,updateTable)

export default Router