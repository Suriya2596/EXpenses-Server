const mongoose = require('mongoose')
const { Schema } = mongoose

const isEmail = require("validator/lib/isEmail")
const isNumeric = require("validator/lib/isNumeric")

const userSchema = new Schema({
    userName:{
        type:String,
        unique:true,
        required:[true,"User Name is invalidate"]
    },
    email:{
        type:String,
        required:[true,"Email is invalidate"],
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return "Email invalidate"
            }
        }
    },
    mobile:{
        type:String,
        required:[true,"Mobile is invalidate"],
        unique:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                return isNumeric(value)
            },
            message:function(){
                return "Mobile Number Invalidate"
            }
        }
    },
    role:{
        type:String,
        default:"user"
    },
    password:{
        type:String,
        required:[true,"Password is invalidate"],
        unique:true,
        minlength:6,
        maxlength:128,
    },
    image:{
        type:String,
        default:""
    },
    occupation:{
        type:String,
        default:""
    }

},{timestamps:true})

const User = mongoose.model("User",userSchema)

module.exports = User