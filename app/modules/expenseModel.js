const mongoose = require("mongoose")
const {Schema} = mongoose

const expenseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    expenseData:{
        type:Date,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    }
},{timestamps:true})

const Expense = mongoose.model("Expense",expenseSchema)

module.exports = Expense