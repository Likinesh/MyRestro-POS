import createHttpError from "http-errors";
import orderModel from "../models/orderModel.js"
import mongoose from "mongoose";

export const add_order = async (req,res,next) =>{
    try {
        const { customerDetails,orderStatus,bills,items } = req.body
        const order = new orderModel(req.body);
        await order.save();
        res.status(200).json({success:true,message:"Order Created!",data:order});
    } catch (error) {
        next(error)
    }
}

export const get_order = async (req,res,next) =>{
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404,"Invalid Id");
            return next(error);
        }

        const order = await orderModel.findById(id);
        if(!order){
            const error = createHttpError(404,'Order Not Found');
            return next(error);
        }

        res.status(200).json({success:true,data:order});

    } catch (error) {
        next(error);
    }
}

export const get_orders = async (req,res,next) =>{
    try {
        const orders = await orderModel.find().populate("table");
        res.status(200).json({success:true,data:orders});
    } catch (error) {
        next(error);
    }
}

export const update_order = async (req,res,next) =>{
    try {

        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404,"Invalid Id");
            return next(error);
        }

        const { orderStatus } = req.body;
        const order = await orderModel.findByIdAndUpdate(id,{orderStatus},{new:true});
        if(!order){
            const error = createHttpError(404,'Order Not Found');
            return next(error);
        }
        res.status(200).json({success:true,message:"Order Updated Successfully!",data:order});

    } catch (error) {
        next(error);
    }
}