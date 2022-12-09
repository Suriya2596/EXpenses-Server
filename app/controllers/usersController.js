const User = require("../modules/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const usersController = {}

usersController.register = (req,res)=>{
    const body = req.body
    const user = new User(body)
    bcryptjs.genSalt(2)
        .then((salt)=>{
            bcryptjs.hash(user.password,salt)
                .then((encryptedPassword)=>{
                    user.password = encryptedPassword
                    user.save()
                        .then((userData)=>{
                            res.json(userData)
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
                })
        })
}
usersController.login = (req,res)=>{
    const body = req.body
    User.findOne({email:body.email})
        .then((user)=>{
            if(user){
                bcryptjs.compare(body.password,user.password)
                    .then((match)=>{
                        if(match){
                            const tokenData = {
                                _id:user._id,
                                email:user.email,
                                mobile:user.mobile
                            }
                            const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"})
                            res.json({token:`Bearer ${token}`})
                        }else{
                            res.json({errors:"Invalidate email or password",message:"Invalidate email or password"})
                        }
                    })
            }else{
                res.json({errors:"Invalidate email or password",message:"Invalidate email or password"})
            }
        })
}

usersController.account = (req,res)=>{
    res.json(req.user)
}

usersController.update = (req,res)=>{
    const body = req.body
    User.findOneAndUpdate( {_id:req.user._id } , body , { new: true, runValidators: true } )
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = usersController