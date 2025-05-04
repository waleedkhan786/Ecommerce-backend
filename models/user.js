import mongoose from 'mongoose'
const schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 4
    }
})


const User = new Model("user", userSchema)
export default User