import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import User from '../models/userModal.js'

export const isVerified = async(req,res,next)=>{
    try {
        const { token } = req.cookies;
        if(!token){
            const error = createHttpError(401,"Provide Token");
            return next(error);
        }

        const decoded  =jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findById(decoded._id);
        if(!user){
            const error = createHttpError(401,"User Not Exists");
            return next(error);
        }

        req.user = user;
        next();

    } catch (error) {
        const err = createHttpError(401,"Invalid Token!");
        next(err);
    }
}