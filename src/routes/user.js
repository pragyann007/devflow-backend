import express from "express"
import { User } from "../models/user.models.js"
import { requireAuth } from "../middlewares/auth.js"

export const userRouter = express.Router()

userRouter.get("/lado",requireAuth,async(req,res)=>{
  const auth = req.auth
  console.log(auth);
  res.send("hii")
  
})

// routes/user.routes.js

userRouter.post("/sync", requireAuth, async (req, res) => {
  try {
    const clerkUser = req.clerkUser

    const user = await User.findOneAndUpdate(
      {
        clerkId: clerkUser.id,
      },
      {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        avatar: clerkUser.imageUrl,
        username: clerkUser.username,
      },
      {
        upsert: true,
        new: true,
      }
    )

    console.log(user)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Sync failed",
    })
  }
})