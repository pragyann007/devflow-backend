import mongoose, { mongo } from "mongoose";

const userSchema =new mongoose.Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true


    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    avatar:{
        type:String,
    },
    userName:{
        type:String
    }
})


export const User =  mongoose.model("User",userSchema);
