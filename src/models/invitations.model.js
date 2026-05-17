import mongoose from "mongoose"

const invitationSchema = new mongoose.Schema(
{
    email:{
        type:String,
        required:true
    },
    invitedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending", "accepted", "rejected"],
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects",
        required: true
      }
}
)


export const Invitations = mongoose.model("Invitations",invitationSchema)