import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI), {
            dbName: "SmartBazar"
        };
        console.log("Connected to mongoDb");
    }
    catch (error) {
        console.log(error);
    }
};
export default connectDB;
