import mongoose from "mongoose";

const activityScehma = new mongoose.Schema({
    activity:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    type: {
        type: String,
        enum: ["TASK_CREATED", "TASK_UPDATED", "PROJECT_CREATED", "INVITED"]
      },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Projects"

    }

})


export const Actvity = mongoose.model("Activity",activityScehma);
