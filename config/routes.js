const express = require("express")
const routes = express.Router()

// multer
// const multer = require("multer")
// const storage = multer.diskStorage({
//     destination: (req,file,callback)=>{
//         callback(null,"../uploads")
//     },
//     filename:(req,file,callback)=>{
//         callback(null,file.originalname)
//     }
// })
// const upload = multer({storage:storage})

// multer 2
const multer = require("multer")
const upload = multer({dest:'uploads/'})

const usersController = require("../app/controllers/usersController")
const budgetsController = require("../app/controllers/budgetsController")
const categoriesController = require("../app/controllers/categoriesController")
const expensesController = require("../app/controllers/expensesController")
const {authentication,authorization} = require("../app/middlers/authentication")

routes.post("/api/user/register",usersController.register)
routes.post("/api/user/login",usersController.login)
routes.get("/api/user/account",authentication,usersController.account)
routes.put("/api/user/account",authentication,upload.single("image"),usersController.update)

routes.post("/api/user/budget",budgetsController.create)
routes.get("/api/user/budget",authentication,budgetsController.list)
routes.put("/api/user/budget",authentication,budgetsController.update)
routes.delete("/api/user/budget",authentication,authorization,budgetsController.destroy)

routes.post("/api/user/category",authentication,categoriesController.create)
routes.get("/api/user/category",authentication,categoriesController.list)
routes.get("/api/user/category/:id",authentication,categoriesController.show)
routes.put("/api/user/category/:id",authentication,categoriesController.update)
routes.delete("/api/user/category/:id",authentication,authorization,categoriesController.destroy)

routes.post("/api/user/expense",authentication,expensesController.create)
routes.get("/api/user/expense",authentication,expensesController.list)
routes.get("/api/user/expense/:id",authentication,expensesController.show)
routes.put("/api/user/expense/:id",authentication,expensesController.update)
routes.delete("/api/user/expense/:id",authentication,authorization,expensesController.destroy)
routes.get("/api/user/expenseChart",authentication,expensesController.budgetCalculate)

module.exports = routes