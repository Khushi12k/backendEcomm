import "dotenv/config";
import mongoose from "mongoose";


async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to MongoDB successfully");
        
    }
    catch (error) {
        console.log("Error connecting to database:", error);
    }
}
export default connectToDB;



