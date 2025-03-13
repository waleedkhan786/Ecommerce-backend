import express from 'express'
const app = express();
const port = 8000;

app.get('/',(req,res)=>{
   return res.json({message:"Hello from node app"});
})
app.listen(port,()=>{
    console.log(`Server is listening on ${port}`)
})