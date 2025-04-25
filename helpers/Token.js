import  jwt from "jsonwebtoken"
const jwtSecret = "SecurePass"
export const createToken = async(id, email, expire)=>{
    try{

        const payload = {
            id,
            email,
            expire
        }
        const token =  jwt.sign(payload,jwtSecret, {expiresIn: expire});
        return token;
    }catch(error){
console.log(error.message)
return error.message;
    }
   
};



export const verifyToken = async(req,res, next)=>{
    const token = req.signedCookies["userCookie"];
    if(!token || token?.trim() == ""){
        return res.status(404).json({message: "token not found"})
    }else{
        return new Promise((resolve,reject)=>{
            return jwt.verify(token, jwtSecret, (err, success)=>{
    if(err){
        reject();
        return res.status(401).json({message:"Token Expired or Token not Found", err })
    }else
    {
        resolve()
        res.locals.userData = success;
        return next();
    }
            })
        })
    }
    
}



