const express = require("express")

const categoryRoutes = require("./src/routes/category")
const authRoutes = require("./src/routes/auth")
const sequelize = require("./src/util/database")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json());

app.use(categoryRoutes)
app.use(authRoutes)

app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message : error.message})
})

sequelize
.sync()
.then((result)=>{
    app.listen(8080, ()=>{
        console.log("App is running on port 8080")
    })
})


