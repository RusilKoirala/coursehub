
import mongoose from "mongoose";



const ConnectDB = async ()=> {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting database : "+ error)
    }
}

export default ConnectDB