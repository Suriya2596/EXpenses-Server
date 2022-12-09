const User = require("../modules/userModel")
const jwt = require("jsonwebtoken")

const authentication = (req,res,next)=>{
    const token = req.header("Authorization").split(" ")[1]
    try{
        const tokeenData = jwt.verify(token,process.env.JWT_SECRET)
        User.findById(tokeenData._id)
            .then((user)=>{
                req.user = user
                next()
            })
            .catch(()=>{
                res.json({errors:"Invaidate Token",message:"Invaidate Token"})
            })
    }catch(err){
        res.json({errors:"Invaidate Token",message:"Invaidate Token"})
    }
}

const authorization = (req,res,next)=>{
    if(req.user.role==="admin"){
        next()
    }else{
        res.json({notice:"You can't access this url"})
    }
}


module.exports = {
    authentication,authorization
}