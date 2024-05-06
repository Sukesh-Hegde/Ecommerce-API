import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL=process.env.MONGODB_URI
// const URL="mongodb+srv://sukesh:1234@cluster0.cvyliz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
export const connectUsingMongoose = async()=>{
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true   
        });
        console.log('Mongodb Connected using Mongoose');
    }catch(err){
        console.log("Error while connecting to db")
        console.log(err);
    }  
}

