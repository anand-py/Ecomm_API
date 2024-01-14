const express = require("express")

const categoryRoutes = require("./src/routes/category")
const productRoutes = require("./src/routes/product")
const authRoutes = require("./src/routes/auth")
const sequelize = require("./src/util/database")
const bodyParser = require("body-parser")
const User = require("./src/model/user")
const Product = require("./src/model/product")
const Order = require("./src/model/order")

const app = express()

app.use(bodyParser.json());

app.use(categoryRoutes)
app.use(authRoutes)
app.use(productRoutes)

app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message : error.message})
})

Product.belongsToMany(User, {through: Order})

sequelize
.sync()
.then((result)=>{
    app.listen(8080, ()=>{
        console.log("App is running on port 8080")
    })
})


