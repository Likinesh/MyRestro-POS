import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: "Email must be in valid format!"
        }
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        validate:{
            validator:function(v){
                return /\d{10}/.test(v);
            },
            message:"Phone number must be 10-digit number!"
        }
    },
    role:{
        type:String,
        required:true,
    }
},{timestamps:true});


export default mongoose.model('User',userSchema);