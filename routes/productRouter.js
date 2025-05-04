import express from "express"
const router = express.Router();
import { parser } from "../helpers/config.js";
import Product from "../models/product.js";

router.post("/add-product",parser.single("image"),async(req,res)=>{
    const {name,description,price,category} = req.body;
    const path = req.file.path;
    if(path){
        const product = await Product.create({name,description,price,category:category.toLowerCase(),imgUrl:path});
        console.log(product)
    }
})
export default router;