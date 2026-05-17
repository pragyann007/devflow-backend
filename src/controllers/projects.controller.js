import { Projects } from "../models/projects.model";
import { User } from "../models/user.models";

export const createProject = async(req,res)=>{
    const {title,description,techStack,duration,dueDate,githubLink} = req.body;
    const ownerId = req.user._id;

    try {
        if(!title || !description || !techStack || !duration || !dueDate){
            return res.status(400).json({message:"All fields are required"})
        }
        
        const newProject = new Projects({
            title,
            description,
            techStack,
            duration,
            dueDate,
            githubLink,
            ownerId,
            members:[ownerId]
        })
        await newProject.save();
        res.status(201).json({message:"Project created successfully",project:newProject})
        
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({message:"Server error"})
        
    }

}

export const getProjects = async(req,res)=>{
    const userId = req.user._id;
    try {
        const project = await Projects.find({members:userId});
        res.status(200).json({projects:project})
        
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({message:"Server error"})
        
    }
}

export const getProjectById = async(req,res)=>{
    const projectId = req.params.id;
    const userId = req.user._id;
    try {
        const project = await Projects.findOne({_id:projectId,members:userId});
        if(!project){
            return res.status(404).json({message:"Project not found"})
        }
        res.status(200).json({project})
        
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({message:"Server error"})
        
    }
}

export const deleteProject = async(req,res)=>{
    const projectId = req.params.id;
    const userId = req.user._id;
    try {
        const project = await Projects.findOne({_id:projectId,ownerId:userId});
        if(!project){
            return res.status(404).json({message:"Project not found or you are not the owner"})
        }
        await Projects.deleteOne({_id:projectId});
        res.status(200).json({message:"Project deleted successfully"})
        
    }
        catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({message:"Server error"})
        }
    }
export const updateProject = async(req,res)=>{
    const projectId = req.params.id;
    const userId = req.user._id;
    const {title,description,techStack,duration,dueDate,status,githubLink} = req.body;
    try {
        const project = await Projects.findOne({_id:projectId,ownerId:userId});
        if(!project){
            return res.status(404).json({message:"Project not found or you are not the owner"})
        }
        project.title=title || project.title;
        project.description=description || project.description;
        project.techStack=techStack || project.techStack;
        project.duration=duration || project.duration;
        project.dueDate=dueDate || project.dueDate;
        project.status=status || project.status;
        project.githubLink=githubLink || project.githubLink;
        
        await project.save();
        res.status(200).json({message:"Project updated successfully",project})
        
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({message:"Server error"})
        
    }
}

export const addMember = async (req, res) => {

    const projectId = req.params.id;
    const userId = req.user._id;
    const { memberMail } = req.body;

    try {

        const project = await Projects.findOne({
            _id: projectId,
            ownerId: userId
        }).populate("members", "email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found or unauthorized"
            });
        }

        const member = await User.findOne({
            email: memberMail
        });

        if (!member) {
            return res.status(404).json({
                message: "No user found with that email"
            });
        }

        if (userId.toString() === member._id.toString()) {
            return res.status(400).json({
                message: "You are already the owner"
            });
        }

        const ifUserExists = project.members.some(
            projectMember =>
                projectMember._id.toString() === member._id.toString()
        );

        if (ifUserExists) {
            return res.status(400).json({
                message: "User already a member"
            });
        }

        project.members.push(member._id);

        await project.save();

        return res.status(200).json({
            message: "Member added successfully",
            project
        });

    } catch (error) {

        console.error("Error adding member:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};