import { response } from "express";
import { createToken } from "../helpers/Token.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const signupUser = async(req,res)=>{
    const {name,email,password} = req.body;
    console.log(name,email,password);
    const user = await User.findOne({email})
    if(user) return res.status(400).json({message:"User Already exist!"})
    const newPassword = await bcrypt.hash(password, 5)
   const response = await new User({name,email, password:newPassword})
   await response.save();

   
   res.clearCookie("userCookie",{
    path:"/",
    domain: "localhost",
    httpOnly: true,
    signed: true,
    secure: true,
  })

//   create token
//sigup -> cookie -> browser -> getmedata -> backend -> cookie -> token -> value

const token = await createToken(response._id.toString(), response.email, "7d");
const expires = new Date();
expires.setDate(expires.getDate() + 7) ///24.set(24+7)


// sending cookie
res.cookie("userCookie",token,{ 
    path:"/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
    secure: true
})


    return res.status(200).json({message: "user added successfully", user: response})
}

export const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
         return res.status(404).json({message:"User is not found"});
}
        const isTrue = await bcrypt.compare(password,user.password);
  if(!isTrue){

   return res.status(400).json({message:"paswwoed invalid"});
  }

  res.clearCookie("userCookie",{
    path:"/",
    domain: "localhost",
    httpOnly: true,
    signed: true,
    secure: true,
  })

//   create token

const token = await createToken(user._id.toString(), user.email, "7d");
const expires = new Date();
expires.setDate(expires.getDate() + 7)

res.cookie("userCookie",token,{ 
    path:"/",
    domain: "localhost",
    expires,
    httpOnly: true,
    signed: true,
    secure: true
})

    return res.status(200).json({message:"Login successful"});
        
}

export const verifyUser = async(req,res)=>{
  const id = res.locals.userData.id;
  const user = await User.findById(id)
  if(!user)  return res.status(404).json({message:"User not found"});
  return res.status(200).json({message:"User Authenticated",user})
   
}


export const logoutUser = async(req,res)=>{
  res.clearCookie("userCookie",{
    path:"/",
    domain: "localhost",
    httpOnly: true,
    signed: true,
    secure: true,
  })
  return res.status(200).json({message:"User Successfully Loged Out"})
}
