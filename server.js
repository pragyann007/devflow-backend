import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import mongoDbConection from "./src/config/mongodb.js"
import { clerkMiddleware } from "@clerk/express"
import { userRouter } from "./src/routes/user.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(helmet())
app.use(morgan("common"))
console.log(process.env.CLERK_SECRET_KEY)
app.use(clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    

}));

app.use("/api/user",userRouter)

mongoDbConection.connect();

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
