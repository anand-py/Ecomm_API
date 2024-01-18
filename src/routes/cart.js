const router = require("express").Router()
const cartController = require("../controller/cart")
const isAuth = require("../middleware/isAuth")
const isAuthorized = require("../middleware/isAuthorized")

router.get("/cart/:id", cartController.getCart)



module.exports = router;