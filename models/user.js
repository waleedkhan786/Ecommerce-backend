import mongoose from 'mongoose'
const schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true,
        min: 4
    }
})


const User = new Model("user", userSchema)
export default User