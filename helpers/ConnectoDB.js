import mongoose from "mongoose";


export const connect = ()=>{
    mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=>console.log("Connected to DB")).catch((err)=>console.log(err.message))
}
