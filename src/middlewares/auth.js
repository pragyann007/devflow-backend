import { clerkClient, getAuth } from "@clerk/express"



export const requireAuth = async (req,res,next)=>{
  const {userId} = getAuth(req);

  console.log('w1')
  if(!userId) return res.status(403).json({message:"User not authenticated."})
    console.log('w2')


    const user = await clerkClient.users.getUser(userId);

    req.clerkUser = user ;
    next()
  
}