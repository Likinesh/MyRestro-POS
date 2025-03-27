import User from '../models/userModal.js'
import bcrypt from 'bcrypt'
import { createHttpError } from 'http-errors';
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) =>{
    try {
        const {name,email,phone,password,role} = req.body;
        if(!name || !email || !phone || !password || !role){
             const error = createHttpError(400,"All fields are required");
             return next(error);
        }

        const ExistingUser = await User.findOne({email}); 
        if(ExistingUser){
            const error = createHttpError(400,"User Already Registered");
            return next(error);
        }

        const new_user = User({name,email,password,phone,role});
        await new_user.save();

        return res.status(200).json({success:true,message:"Successfully Registered!",data:new_user});

    } catch (error) {
        next(error);
    }
}

export const login = async(req,res,next) =>{
    try {
        const{email,password} = req.body;
        if(!email || !password){
            const error = createHttpError(400,"All Fields are Required");
            return next(error);
        }

        const user = await User.findOne({email});
        if(!user){
            const err = createHttpError(401,"Invalid Credentials");
            return next(err);
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            const err = createHttpError(401,"Invalid Credentials");
            return next(err);
        }

        const accessToken = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});
        res.cookie('token',accessToken,{
            maxAge:1000*60*60*24*30,
            httpOnly:true,
            secure:true,
            sameSite:'none',
        })

        return res.status(200).json({success:true,message:"Login Successful!",data:user});

    } catch (error) {
        next(error);
    }
}


export const getUserData = async(req,res,next) => {
    try {
        const user = await User.findById(req.user._id);
        return res.status(200).json({success:true,data:user});
        
    } catch (error) {
        next(error);
    }
}