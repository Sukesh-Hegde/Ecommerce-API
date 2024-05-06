import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongodb+srv://sukesh:<password>@cluster0.cvyliz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// const URL="mongodb://localhost:27017/Ecom-API"
const URL="mongodb+srv://sukesh:1234@cluster0.cvyliz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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

