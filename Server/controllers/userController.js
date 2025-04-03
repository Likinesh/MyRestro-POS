import userModal from '../models/userModal.js'
import bcrypt from 'bcrypt'
import createHttpError  from 'http-errors';
import jwt from 'jsonwebtoken';

export const register = async(req,res,next) =>{
    try {
        const {name,email,phone,password,role} = req.body;
        if(!name || !email || !phone || !password || !role){
             const error = createHttpError(400,"All fields are required");
             return next(error);
        }

        const ExistingUser = await userModal.findOne({email}); 
        if(ExistingUser){
            const error = createHttpError(400,"User Already Registered");
            return next(error);
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword= await bcrypt.hash(password,salt);

        const new_user = userModal({name,email,password:hashpassword,phone,role});
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

        const user = await userModal.findOne({email});
        if(!user){
            const err = createHttpError(401,"Invalid Credentials");
            console.log(err);
            return next(err);
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            const err = createHttpError(401,"Invalid Credentials");
            console.log(err);
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
        const user = await userModal.findById(req.user._id);
        return res.status(200).json({success:true,data:user});
        
    } catch (error) {
        next(error);
    }
}

export const logout = async (req,res,next)=>{
    try {
        res.clearCookie('token');
        res.json(200).json({success:true,message:"Logout SuccessFul!"})
    } catch (error) {
        next(error)
    }
}