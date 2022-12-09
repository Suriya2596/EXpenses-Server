const mongoose = require("mongoose")
const {Schema} = mongoose
const categorySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true})

const Category = mongoose.model("Category",categorySchema)

module.exports = Category