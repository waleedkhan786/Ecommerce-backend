import express from 'express'
import multer from 'multer';
// import bcrypt from 'bcrypt'
// import User from './models/user.js';
import { parser } from './helpers/config.js';
import cors from 'cors'
import { connect } from './helpers/ConnectoDB.js';
import { loginUser,verifyUser, signupUser,logoutUser} from './Controller/User.js';
import cookieParser from 'cookie-parser';
import { verifyToken } from './helpers/Token.js';
import productRouter from "./routes/productRouter.js"

const app = express();
const port = 8000;
const cookieSecret = "bunker"
//middlewear
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(cookieSecret));
app.use("/product",productRouter)

app.get('/check-user', verifyToken, verifyUser)

app.post('/signup', signupUser)

app.post('/login', loginUser)
app.delete('/logout', logoutUser)

app.post('/profile', parser.single("image"),(req,res)=>{
    console.log(req.body);   
    console.log(req.file);   
   return res.status(200).json({message:"File uploaded successfully!"});
})


connect();
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})

//add product page with backend functionlity
//filters , search , categories functionality
//admin 