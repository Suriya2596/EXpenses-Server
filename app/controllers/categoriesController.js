const Category = require("../modules/categoryModel")
const categoriesController = {}

categoriesController.create = (req,res)=>{
    const body = req.body
    const category = new Category(body)
    category.user = req.user._id
    category.save()
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.list = (req,res)=>{
    Category.find({user:req.user._id})
        .then((categoriess)=>{
            res.json(categoriess)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.show = (req,res)=>{
    const id = req.params.id
    Category.findOne({_id:id,user:req.user._id})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.update = (req,res)=>{
    const body = req.body
    const id = req.params.id
    Category.findOneAndUpdate({_id:id,user:req.user._id},body,{runValidators:true,new:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

categoriesController.destroy = (req,res)=>{
    const id = req.params.id
    Category.findOneAndDelete({_id:id,user:req.user._id})
        .then((categoriess)=>{
            res.json(categoriess)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports = categoriesController