import mongoose from "mongoose"

const projectsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    techStack:{
        type:[String],
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    dueDate:{
        type:String,
        required:true

    },
    status:{
        type:String,
        enum:["In Progress","Paused","Finished","Closed"],
        required:true,
        default:"In Progress"
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    githubLink:{
        type:String
    },
    

})


export const Projects = mongoose.model("Projects",projectsSchema)