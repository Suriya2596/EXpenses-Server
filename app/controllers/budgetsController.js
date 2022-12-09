const Budget = require("../modules/budgetModel")

const budgetsController = {}

budgetsController.create = (req,res)=>{
    const body = req.body
    const budget = new Budget(body)
    budget.save()
        .then((budgetData)=>{
            res.json(budgetData)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetsController.list = (req,res)=>{
    Budget.findOne({user:req.user._id})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetsController.update = (req,res)=>{
    Budget.findOneAndUpdate({user:req.user._id},req.body,{runValidators:true,new:true})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}

budgetsController.destroy = (req,res)=>{
    Budget.findOneAndDelete({user:req.user._id})
        .then((budget)=>{
            res.json(budget)
        })
        .catch((err)=>{
            res.json(err)
        })
}
module.exports = budgetsController