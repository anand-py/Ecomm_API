const express = require("express")

const categoryRoutes = require("./src/routes/category")

const app = express()



app.use(categoryRoutes)



app.listen(8080, ()=>{
    console.log("App is running on port 8080")
})