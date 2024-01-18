const express = require("express")

const bodyParser = require("body-parser")
const sequelize = require("./src/util/database")


const categoryRoutes = require("./src/routes/category")
const productRoutes = require("./src/routes/product")
const authRoutes = require("./src/routes/auth")
const cartRoutes = require("./src/routes/cart")


const User = require("./src/model/user")
const Product = require("./src/model/product")
const Category = require("./src/model/category") 
const Order = require("./src/model/order")
const Role = require("./src/model/role")
const UserRole = require("./src/model/userRole")
const Cart = require("./src/model/cart")
const CartItem = require("./src/model/cartItem")


const app = express()

app.use(bodyParser.json());
app.use(categoryRoutes)
app.use(authRoutes) 
app.use(productRoutes)
app.use(cartRoutes)

app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message : error.message})
})


  
  Role.create({
    name: "admin"
  }).then((role) => {
    console.log("Admin role created:", role);
  }).catch((error) => {
    console.error("Error creating admin role:", error);
  });
  Role.create({
    name: "customer"
  }).then((role) => {
    console.log("Customer role created:", role);
  }).catch((error) => {
    console.error("Error creating user role:", error);
  });
  Role.create({
    name: "seller"
  }).then((role) => {
    console.log("seller role created:", role);
  }).catch((error) => {
    console.error("Error creating user role:", error);
  });

  
User.hasOne(Cart)  
Product.belongsToMany(User, {through: Order})
Category.hasMany(Product)
User.belongsToMany(Role, {through : UserRole});
Role.belongsToMany(User, {through : UserRole})
Cart.belongsToMany(Product, {through : CartItem});
Product.belongsToMany(Cart, {through : CartItem})


sequelize
.sync()
.then((result)=>{
    app.listen(8080, ()=>{
        console.log("App is running on port 8080")
    })
})
.catch((error) => {
    console.error('Error syncing database:', error);
});


