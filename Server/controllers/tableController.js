import createHttpError from "http-errors";
import tableModal from "../models/tableModal.js";
import mongoose from "mongoose";

export const addTable = async(req,res,next)=>{
    try {
        const { tableNo,seats } = req.body;
        if(!tableNo){
            const error = createHttpError(400,"Provide Table No!");
            return next(error)
        }

        const isPresent = await tableModal.findOne({tableNo});
        if(isPresent){
            const error = createHttpError(400,"Table Already Exist!");
            return next(error)
        }

        const new_table = new tableModal({tableNo,seats});
        await new_table.save();

        res.status(201).json({success:true,message:'Table Added!',data:new_table});

    } catch (error) {
        next(error);
    }
}

export const getTable = async(req,res,next)=>{
    try {
        const tables = await tableModal.find();
        res.status(201).json({success:true,data:tables});
    } catch (error) {
        next(error);
    }
}

export const updateTable = async(req,res,next)=>{
    try {
        const { status,orderId } = req.body;
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = createHttpError(404,"Invalid Id");
            return next(error);
        }

        const table = await tableModal.findByIdAndUpdate(id,{status,currentOrder:orderId},{new:true});
        if(!table){
            const error = createHttpError(400,"Table Not Found!");
            return next(error)
        } 

        res.status(201).json({success:true,message:'Table Updated!',data:table});

    } catch (error) {
        next(error);
    }
}