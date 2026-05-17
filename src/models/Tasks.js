import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true,
        enum:["High","Low","Medium"]
    },
    status:{
        type:String,
        
        
        enum:["Todo","InProgress","Completed"],
        default:"Todo"
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Projects"
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"

    }
    


})

export const Tasks = mongoose.model("Tasks",TaskSchema);