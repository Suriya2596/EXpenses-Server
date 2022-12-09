const Expense = require("../modules/expenseModel")
const Budget = require("../modules/budgetModel")
const Category = require("../modules/categoryModel")
const expensesController = {}

expensesController.create = (req, res) => {
    const body = req.body
    const expense = new Expense(body)
    expense.user = req.user._id
    // Category.findOne({_id:expense.category,user:req.user._id})
    //     .then((category)=>{
    //         expense.category = category
    //     })
    expense.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.list = (req, res) => {
    Expense.find({ user: req.user._id })
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Expense.findOneAndUpdate({ _id: id, user: req.user._id }, body, { new: true, runValidators: true })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.show = (req, res) => {
    const id = req.params.id
    Expense.findOne({ _id: id, user: req.user._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.destroy = (req, res) => {
    const id = req.params.id
    Expense.findOneAndDelete({ _id: id, user: req.user._id })
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.budgetCalculate = (req, res) => {
    Expense.find({ isDelete: false, user: req.user._id })
        .then((expenses) => {
            const totleExpense = expenses.reduce((pv, cv) => {
                return pv + cv.amount
            }, 0)
            Budget.findOne({ user: req.user._id })
                .then((budget) => {
                    const totlaBudget = budget.amount
                    const totalPercentage = Math.round((totleExpense / totlaBudget) * 100)
                    res.json({ totalPercentage, totleExpense, totlaBudget })
                })
                .catch((err) => {
                    res.json(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}

// expensesController.categoryExpenses = (req, res) => {
//     Category.find({ user: req.user._id })
//         .then((categories) => {
//             Expense.find({ user: req.user._id ,isDeleted:false})
//                 .then((expenses) => {
//                     const reultExpense = () => {
//                         let result = []
//                         categories.forEach((category) => {
//                             let titleCategory = category.title
//                             let sum = 0
//                             expenses.forEach((expense) => {
//                                 if (category._id === expense.category) {
//                                     sum += Number(expense.amount)
//                                 }
//                             })
//                             result.push({ [titleCategory]: sum })
//                         })
//                         return result
//                     }
//                     res.json(reultExpense())
//                 })
//                 .catch((err) => {
//                     res.json(err)
//                 })
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

module.exports = expensesController