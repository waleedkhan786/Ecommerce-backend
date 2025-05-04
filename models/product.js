import mongoose from 'mongoose'
const schema = mongoose.Schema
const Model = mongoose.model

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
        type: String, 
        anum:["men,women"],
        required: true
    },
    imgUrl:{
        type:String,
        required:true
    }
})


const Product = new Model("product", productSchema)
export default Product