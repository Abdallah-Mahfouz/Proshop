import mongoose from "mongoose";

const connectDB=async() => {
    try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connect: ${db.connection.host}`);
    }catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);//to exit the process with error


    }
};
export default connectDB;
//basically we just need to call this at the beginning of our application to connect.