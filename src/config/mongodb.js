import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class MongoDbConection{
    constructor(){
        this.connection = null;

    }
    connect(){
        if(this.connection) return this.connection;
        mongoose.connect(process.env.MONGO_URI).then((conn) => {
            this.connection = conn;
            console.log("MongoDB connected");
        }).catch((err) => {
            console.error("MongoDB connection error:", err);
        });


    }

    disconnect(){
        if(!this.connection) return;
        mongoose.disconnect().then(() => {
            this.connection = null;
            console.log("MongoDB disconnected");
        }).catch((err) => {
            console.error("MongoDB disconnection error:", err);
        });
    }

}


const mongoDbConection = new MongoDbConection();
export default mongoDbConection;